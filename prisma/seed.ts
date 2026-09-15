import { prisma } from '../src/lib/db'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('Seeding database...')

  // --- Admin ---
  const username = process.env.ADMIN_USERNAME ?? 'admin'
  const password = process.env.ADMIN_PASSWORD ?? 'Admin12345!'
  const passwordHash = await bcrypt.hash(password, 10)

  await prisma.admin.upsert({
    where: { username },
    update: { passwordHash },
    create: { username, passwordHash },
  })
  console.log(`Admin created/updated: ${username}`)

  // --- Categories ---
  const categoriesData = [
    { name: 'Горячее', slug: 'goryachee', description: 'Мясные и рыбные горячие блюда', image: '/categories/goryachee.webp' },
    { name: 'Десерты', slug: 'deserty', description: 'Торты, пирожные, сладкие угощения', image: '/categories/deserty.webp' },
    { name: 'Салаты', slug: 'salaty', description: 'Свежие и лёгкие блюда', image: '/categories/salaty.webp' },
    { name: 'Гастробоксы', slug: 'gastroboxy', description: 'Готовые наборы для пикника и вечеринки', image: '/categories/gastroboxy.png' },
    { name: 'Детское меню', slug: 'detskoe', description: 'Яркие блюда для маленьких гостей', image: '/categories/detskoe.webp' },
  ]

  const categoryBySlug: Record<string, number> = {}
  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    })
    categoryBySlug[cat.slug] = created.id
  }
  console.log(`Categories: ${categoriesData.length}`)

  // --- Products ---
  const productsData = [
    {
      name: 'Фуршет Императорский',
      description: 'Горячие мясные блюда, изысканные закуски, ассорти сыров и мясных деликатесов',
      price: 7500,
      categorySlug: 'goryachee',
    },
    {
      name: 'Праздничный микс',
      description: 'Разнообразные салаты, закуски и горячее - идеально для корпоратива',
      price: 5800,
      categorySlug: 'salaty',
    },
    {
      name: 'Десертный рай',
      description: 'Торты, пирожные, эклеры, маффины и фруктовые композиции',
      price: 3500,
      categorySlug: 'deserty',
    },
    {
      name: 'Гастробокс "Пикник"',
      description: 'Готовый набор для загородного отдыха - всё упаковано и готово к употреблению',
      price: 2800,
      categorySlug: 'gastroboxy',
    },
    {
      name: 'Детская радость',
      description: 'Яркие, вкусные и безопасные блюда для самых маленьких гостей праздника',
      price: 2500,
      categorySlug: 'detskoe',
    },
    {
      name: 'Банкет Премиум',
      description: 'Полная сервировка для торжества: холодные закуски, горячее, салаты и десерты',
      price: 9800,
      categorySlug: 'goryachee',
    },
  ]

  for (const p of productsData) {
    await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        price: p.price,
        categoryId: categoryBySlug[p.categorySlug],
      },
    })
  }
  console.log(`Products: ${productsData.length}`)

  console.log('Seed complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
