import { prisma } from "@/lib/db"

export async function getFeaturedListings() {
  return await prisma.listing.findMany({
    where: {
      status: "ACTIVE",
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
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
  })
}

export async function getListingById(id: string) {
  return await prisma.listing.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          sellerRating: true,
          createdAt: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })
}

export async function getListingsByCategory(categoryId: string) {
  return await prisma.listing.findMany({
    where: {
      categoryId,
      status: "ACTIVE",
    },
    orderBy: {
      createdAt: "desc",
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
  })
}

export async function getListingsByUser(userId: string) {
  return await prisma.listing.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  })
}

export async function searchListings(query: string) {
  return await prisma.listing.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
      AND: {
        status: "ACTIVE",
      },
    },
    orderBy: {
      createdAt: "desc",
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
  })
} 