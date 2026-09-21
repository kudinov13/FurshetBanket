import { prisma } from '../src/lib/db'

async function main() {
  const products = await prisma.product.findMany({ include: { images: true } })
  let backfilled = 0

  for (const p of products) {
    if (p.image && !p.images.some((i) => i.url === p.image)) {
      const minOrder = p.images.reduce((m, i) => Math.min(m, i.order), 0)
      await prisma.productImage.create({
        data: { url: p.image, order: minOrder - 1, productId: p.id },
      })
      backfilled++
    }
  }

  console.log(`Backfilled ${backfilled} product image(s).`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
