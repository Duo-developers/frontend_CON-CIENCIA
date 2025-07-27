import React from 'react';
import { motion } from 'framer-motion';

export default function BlogPage() {
  return (
    <div className="bg-light-bg text-dark-text font-inter">
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-surface border border-gray-200 rounded-2xl shadow-sm overflow-hidden md:flex">
            <div className="md:w-1/2">
              <img
                className="h-64 w-full object-cover md:h-full"
                src="https://placehold.co/800x600/1f2937/3b82f6?text=Física+de+Partículas"
                alt="Artículo Destacado"
              />
            </div>
            <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
              <span className="text-sm font-semibold text-primary-blue uppercase">Física</span>
              <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-white text-center">
                El Gran Colisionador de Hadrones y los Secretos del Universo
              </h1>
              <p className="text-medium-text mb-6">
                Un vistazo al experimento científico más grande del mundo y su búsqueda de nuevas partículas.
              </p>
              <a
                href="/blog-post"
                className="bg-primary-blue text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 hover:scale-105"
              >
                Leer más
              </a>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-primary-blue pl-4">Artículos Recientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ArticleCard
              category="Biología"
              color="secondary-green"
              title="CRISPR y la Nueva Era de la Ingeniería Genética"
              description="Exploramos cómo la tecnología CRISPR está revolucionando la medicina y la biotecnología..."
              date="15 Julio 2025"
              author="Dra. Laura Ramírez"
              avatar="https://randomuser.me/api/portraits/women/65.jpg"
              image="https://placehold.co/600x400/1f2937/22c55e?text=Biología"
            />
            <ArticleCard
              category="Astronomía"
              color="tertiary-sky"
              title="El Telescopio James Webb Revela Nuevos Mundos"
              description="Las últimas imágenes del telescopio espacial más avanzado están cambiando nuestra comprensión del universo..."
              date="12 Julio 2025"
              author="Ing. Javier Estrella"
              avatar="https://randomuser.me/api/portraits/men/32.jpg"
              image="https://placehold.co/600x400/1f2937/0ea5e9?text=Astronomía"
            />
            <ArticleCard
              category="Química"
              color="primary-blue"
              title="Materiales Inteligentes: El Futuro de la Nanotecnología"
              description="Descubre cómo los nanomateriales están transformando industrias desde la medicina hasta la electrónica..."
              date="10 Julio 2025"
              author="MSc. Sofía Núñez"
              avatar="https://randomuser.me/api/portraits/women/45.jpg"
              image="https://placehold.co/600x400/1f2937/3b82f6?text=Química"
            />
            <ArticleCard
              category="Tecnología"
              color="primary-blue"
              title="La Inteligencia Artificial en la Educación Moderna"
              description="Cómo la IA está personalizando el aprendizaje y transformando la enseñanza en las aulas digitales..."
              date="8 Julio 2025"
              author="Lic. Andrés Ortega"
              avatar="https://randomuser.me/api/portraits/men/53.jpg"
              image="https://placehold.co/600x400/1f2937/3b82f6?text=IA+Educación"
            />
            <ArticleCard
              category="Medicina"
              color="secondary-green"
              title="Vacunas de ARNm: Una Revolución en la Inmunología"
              description="La ciencia detrás de las vacunas de ARNm y cómo están cambiando el futuro de la medicina preventiva..."
              date="5 Julio 2025"
              author="Dra. Mariana López"
              avatar="https://randomuser.me/api/portraits/women/30.jpg"
              image="https://placehold.co/600x400/1f2937/22c55e?text=Vacunas"
            />
            <ArticleCard
              category="Ciencia de Datos"
              color="tertiary-sky"
              title="Big Data y su Impacto en la Toma de Decisiones"
              description="El poder de los datos masivos para transformar gobiernos, empresas y salud pública..."
              date="2 Julio 2025"
              author="MSc. Pablo Girón"
              avatar="https://randomuser.me/api/portraits/men/28.jpg"
              image="https://placehold.co/600x400/1f2937/0ea5e9?text=Big+Data"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function ArticleCard({ category, color, title, description, date, author, avatar, image }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="bg-surface border border-gray-200 rounded-2xl overflow-hidden shadow-sm group hover:shadow-xl transition-shadow duration-300"
    >
      <div className="overflow-hidden">
        <img
          className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={image}
          alt={`Imagen ${category}`}
        />
      </div>
      <div className="p-6">
        <span className={`text-sm font-semibold text-${color} uppercase`}>{category}</span>
        <h3 className="text-xl font-bold mt-2 mb-3">{title}</h3>
        <p className="text-medium-text mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={avatar} alt={author} className="w-8 h-8 rounded-full" />
            <div className="text-sm text-medium-text">
              <p className="font-medium">{author}</p>
              <p className="text-xs">{date}</p>
            </div>
          </div>
          <a href="/blog-post" className={`text-${color} font-semibold hover:underline`}>
            Leer más
          </a>
        </div>
      </div>
    </motion.div>
  );
}