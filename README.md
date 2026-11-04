# Lucília Residencial

Site do **Lucília Residencial**: apartamentos por temporada de 1, 2 e 3 quartos a 250 m da Praia da Pinheira, em Palhoça (SC).

Feito com [Astro](https://astro.build), site estático publicado na Vercel. Fotos e informações tiradas do Instagram [@luciliaresidencial](https://www.instagram.com/luciliaresidencial/).

## Rodar localmente

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # gera o site em dist/
```

## Onde mudar as coisas

- Telefone, WhatsApp, Instagram e textos de SEO: `src/data/site.ts`
- Conteúdo da página (apartamentos, arredores, textos): `src/pages/index.astro`
- Fotos: `src/assets/fotos/` (o Astro otimiza para WebP no build)
- Cores e fontes: `src/styles/global.css`
