import { prisma } from "@/lib/db"

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  })
}

export async function getCategoryById(id: string) {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  })
}

export async function createCategory(data: {
  name: string
  description?: string
  image?: string
}) {
  return await prisma.category.create({
    data,
  })
}

export async function updateCategory(
  id: string,
  data: {
    name?: string
    description?: string
    image?: string
  }
) {
  return await prisma.category.update({
    where: {
      id,
    },
    data,
  })
}

export async function deleteCategory(id: string) {
  return await prisma.category.delete({
    where: {
      id,
    },
  })
} 