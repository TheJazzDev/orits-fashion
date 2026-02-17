/**
 * Prisma seed — populates the database with placeholder data so the site
 * looks complete from day one. Replace images via the admin panel later.
 *
 * Run: bun prisma migrate dev (seed runs automatically)
 *  or: bunx tsx prisma/seed.ts
 */

import "dotenv/config";
import { PrismaClient } from "./generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

const CATEGORIES = [
  { name: "Women's Wear", slug: "womens-wear", description: "Elegant and contemporary designs crafted for the modern woman.", order: 1 },
  { name: "Men's Wear", slug: "mens-wear", description: "Sharp tailoring and refined silhouettes for the distinguished gentleman.", order: 2 },
  { name: "Children's Wear", slug: "childrens-wear", description: "Adorable, comfortable designs made for little ones.", order: 3 },
  { name: "English Wear", slug: "english-wear", description: "Classic English-inspired garments with an African touch.", order: 4 },
  { name: "Garments", slug: "garments", description: "Pristine ceremonial and occasion wear.", order: 5 },
];

// Unsplash fashion images — free to display, no auth required
const PRODUCTS = [
  // Women's Wear
  {
    name: "Bespoke Evening Gown",
    slug: "bespoke-evening-gown",
    description: "An exquisite full-length evening gown crafted from premium silk organza. Hand-embroidered floral motifs adorn the bodice, complemented by a flowing A-line skirt that moves beautifully. Perfect for galas, weddings, and formal occasions.",
    price: 125000,
    featured: true,
    published: true,
    categorySlug: "womens-wear",
    images: [{ url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", alt: "Bespoke Evening Gown", order: 0 }],
  },
  {
    name: "Ankara Fusion Midi Dress",
    slug: "ankara-fusion-midi-dress",
    description: "A stunning fusion of traditional Ankara print and modern silhouette. Features a structured bodice with off-shoulder details and a flared skirt — celebrating African heritage with contemporary flair.",
    price: 75000,
    featured: true,
    published: true,
    categorySlug: "womens-wear",
    images: [{ url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80", alt: "Ankara Fusion Midi Dress", order: 0 }],
  },
  {
    name: "Bridal Lace Gown",
    slug: "bridal-lace-gown",
    description: "Timeless bridal elegance in handcrafted French lace. Features a sweetheart neckline, cathedral train, and intricate beadwork along the bodice.",
    price: 280000,
    featured: false,
    published: true,
    categorySlug: "womens-wear",
    images: [{ url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80", alt: "Bridal Lace Gown", order: 0 }],
  },
  {
    name: "Casual Chic Co-ord Set",
    slug: "casual-chic-coord-set",
    description: "Effortlessly stylish two-piece co-ord set in premium cotton blend. Wide-leg trousers and a tailored crop top with subtle embroidery. Versatile for brunch or smart-casual office looks.",
    price: 55000,
    featured: false,
    published: true,
    categorySlug: "womens-wear",
    images: [{ url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80", alt: "Casual Chic Co-ord Set", order: 0 }],
  },
  // Men's Wear
  {
    name: "Classic Senator Suit",
    slug: "classic-senator-suit",
    description: "A distinguished two-piece senator suit in premium linen. Structured jacket with mandarin collar and matching trousers — embodying refined African masculinity.",
    price: 85000,
    featured: true,
    published: true,
    categorySlug: "mens-wear",
    images: [{ url: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80", alt: "Classic Senator Suit", order: 0 }],
  },
  {
    name: "Agbada Formal Set",
    slug: "agbada-formal-set",
    description: "Regal three-piece Agbada ensemble crafted in rich brocade fabric. Includes the flowing outer robe, inner tunic, and matching trousers with gold thread embroidery.",
    price: 145000,
    featured: false,
    published: true,
    categorySlug: "mens-wear",
    images: [{ url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", alt: "Agbada Formal Set", order: 0 }],
  },
  // Children's Wear
  {
    name: "Mini Ankara Princess Dress",
    slug: "mini-ankara-princess-dress",
    description: "Adorable princess-style dress for little girls in vibrant Ankara print. Puff sleeves, satin sash, and full skirt with petticoat. Perfect for naming ceremonies and birthdays.",
    price: 28000,
    featured: false,
    published: true,
    categorySlug: "childrens-wear",
    images: [{ url: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=800&q=80", alt: "Mini Ankara Princess Dress", order: 0 }],
  },
  // Garments
  {
    name: "Celestial White Kaftan",
    slug: "celestial-white-kaftan",
    description: "Flowing white kaftan in premium Swiss voile with delicate gold embroidery along the neckline and hem. Ideal for church, naming ceremonies, and spiritual occasions.",
    price: 45000,
    featured: false,
    published: true,
    categorySlug: "garments",
    images: [{ url: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80", alt: "Celestial White Kaftan", order: 0 }],
  },
];

const GALLERY_IMAGES = [
  { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", title: "Bespoke Evening Gown", description: "Hand-crafted evening wear with intricate detailing", order: 1 },
  { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80", title: "Ankara Fusion Collection", description: "Modern silhouettes meet traditional African prints", order: 2 },
  { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80", title: "Bridal Couture", description: "Timeless elegance for your most special day", order: 3 },
  { url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80", title: "Street Style Editorial", description: "Effortless everyday fashion with a signature touch", order: 4 },
  { url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80", title: "Luxury Ready-to-Wear", description: "Premium fabrics, impeccable finishing", order: 5 },
  { url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80", title: "Men's Formal Collection", description: "Sharp cuts and refined tailoring for the modern gentleman", order: 6 },
  { url: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=600&q=80", title: "Children's Wear", description: "Adorable designs crafted for comfort and style", order: 7 },
  { url: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80", title: "Garments", description: "Pristine white ceremony and occasion wear", order: 8 },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Upsert categories
  console.log("  → Seeding categories...");
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, order: cat.order },
      create: cat,
    });
  }
  console.log(`  ✓ ${CATEGORIES.length} categories seeded`);

  // Create products (skip if already exists to preserve manual edits)
  console.log("  → Seeding products...");
  for (const product of PRODUCTS) {
    const { images, categorySlug, ...productData } = product;

    const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
    if (!category) {
      console.warn(`  ! Category not found for slug: ${categorySlug}`);
      continue;
    }

    const existing = await prisma.product.findUnique({ where: { slug: productData.slug } });
    if (existing) {
      console.log(`  · Skipping existing product: ${productData.name}`);
      continue;
    }

    await prisma.product.create({
      data: {
        ...productData,
        categoryId: category.id,
        images: {
          create: images.map((img) => ({
            url: img.url,
            alt: img.alt,
            order: img.order,
          })),
        },
      },
    });
    console.log(`  ✓ Created: ${productData.name}`);
  }

  // Upsert gallery images (skip duplicates by URL)
  console.log("  → Seeding gallery images...");
  let galleryCreated = 0;
  for (const img of GALLERY_IMAGES) {
    const existing = await prisma.galleryImage.findFirst({ where: { url: img.url } });
    if (!existing) {
      await prisma.galleryImage.create({ data: img });
      galleryCreated++;
    }
  }
  console.log(`  ✓ ${galleryCreated} gallery images seeded (${GALLERY_IMAGES.length - galleryCreated} already existed)`);

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
