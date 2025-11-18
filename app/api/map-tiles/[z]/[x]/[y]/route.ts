import { NextRequest, NextResponse } from 'next/server';

// OpenStreetMap tile server rotation
const OSM_SERVERS = ['a', 'b', 'c'];

export async function GET(
  _request: NextRequest,
  { params }: { params: { z: string; x: string; y: string } }
) {
  const { z, x, y } = params;

  // Validate tile coordinates
  const zNum = parseInt(z);
  const xNum = parseInt(x);
  const yNum = parseInt(y);

  if (isNaN(zNum) || isNaN(xNum) || isNaN(yNum)) {
    return new NextResponse('Invalid tile coordinates', { status: 400 });
  }

  // Tile coordinate bounds check
  const maxTiles = Math.pow(2, zNum);
  if (xNum < 0 || xNum >= maxTiles || yNum < 0 || yNum >= maxTiles) {
    return new NextResponse('Tile coordinates out of bounds', { status: 400 });
  }

  try {
    // Select a random server for load balancing
    const server = OSM_SERVERS[Math.floor(Math.random() * OSM_SERVERS.length)];
    const tileUrl = `https://${server}.tile.openstreetmap.org/${z}/${x}/${y}.png`;

    // Fetch the tile from OpenStreetMap
    const tileResponse = await fetch(tileUrl, {
      headers: {
        'User-Agent': 'HomsiEngenharia/1.0', // OSM requires User-Agent
      },
      next: {
        revalidate: 31536000, // Cache for 1 year (365 days)
      },
    });

    if (!tileResponse.ok) {
      return new NextResponse('Tile not found', { status: 404 });
    }

    const tileBuffer = await tileResponse.arrayBuffer();

    // Return the tile with appropriate caching headers
    return new NextResponse(tileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable', // 1 year - máximo permitido
        'CDN-Cache-Control': 'public, max-age=31536000, immutable',
        'Vercel-CDN-Cache-Control': 'public, max-age=31536000, immutable',
        'Surrogate-Control': 'public, max-age=31536000, immutable',
        'Expires': new Date(Date.now() + 31536000000).toUTCString(),
      },
    });
  } catch (error) {
    console.error('Error fetching tile:', error);
    return new NextResponse('Error fetching tile', { status: 500 });
  }
}
