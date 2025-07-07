import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    if (!id) {
      return new NextResponse('Demo site ID is required', { status: 400 })
    }

    // Get the HTML file path
    const demoDir = path.join(process.cwd(), 'public', 'demo-sites')
    const filePath = path.join(demoDir, `${id}.html`)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return new NextResponse('Demo site not found', { status: 404 })
    }

    // Read the HTML content
    const htmlContent = fs.readFileSync(filePath, 'utf8')

    // Return the HTML with proper headers
    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error serving demo site:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
