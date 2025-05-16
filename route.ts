import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/db"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const {
      title,
      description,
      price,
      condition,
      location,
      categoryId,
      images,
      videoUrl,
    } = await req.json()

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price,
        condition,
        location,
        images,
        videoUrl,
        userId: session.user.id,
        categoryId,
      },
    })

    return NextResponse.json(listing, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get("categoryId")
    const query = searchParams.get("q")

    const listings = await prisma.listing.findMany({
      where: {
        status: "ACTIVE",
        ...(categoryId && { categoryId }),
        ...(query && {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            sellerRating: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(listings)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
} 