// Função da Vercel: busca nota e avaliações do Lucília Residencial na Google Places API (New).
// Precisa da variável de ambiente GOOGLE_MAPS_API_KEY (configurada no painel da Vercel).
// GOOGLE_PLACE_ID é opcional: sem ele, o lugar é encontrado por busca de texto.
// A resposta fica em cache na CDN por 6 horas para manter o custo da API perto de zero.

const BUSCA = 'Lucília Residencial, Enseada da Pinheira, Palhoça - SC';
const LOCAL = { latitude: -27.8875831, longitude: -48.5941291 };
const CAMPOS = ['id', 'displayName', 'rating', 'userRatingCount', 'reviews', 'googleMapsUri'];

async function buscarLugar(chave) {
  const idFixo = process.env.GOOGLE_PLACE_ID;
  const cabecalhos = { 'X-Goog-Api-Key': chave, 'Content-Type': 'application/json' };

  if (idFixo) {
    const r = await fetch(`https://places.googleapis.com/v1/places/${idFixo}?languageCode=pt-BR`, {
      headers: { ...cabecalhos, 'X-Goog-FieldMask': CAMPOS.join(',') },
    });
    if (!r.ok) throw new Error(`Place Details ${r.status}: ${await r.text()}`);
    return r.json();
  }

  const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: { ...cabecalhos, 'X-Goog-FieldMask': CAMPOS.map((c) => `places.${c}`).join(',') },
    body: JSON.stringify({
      textQuery: BUSCA,
      languageCode: 'pt-BR',
      maxResultCount: 1,
      locationBias: { circle: { center: LOCAL, radius: 500 } },
    }),
  });
  if (!r.ok) throw new Error(`Text Search ${r.status}: ${await r.text()}`);
  const dados = await r.json();
  if (!dados.places?.length) throw new Error('Lugar não encontrado');
  return dados.places[0];
}

export default async function handler(req, res) {
  const chave = process.env.GOOGLE_MAPS_API_KEY;
  if (!chave) {
    res.setHeader('Cache-Control', 's-maxage=300');
    return res.status(200).json({ configurado: false });
  }

  try {
    const lugar = await buscarLugar(chave);
    const avaliacoes = (lugar.reviews || []).map((a) => ({
      autor: a.authorAttribution?.displayName || 'Hóspede',
      foto: a.authorAttribution?.photoUri || null,
      perfil: a.authorAttribution?.uri || null,
      nota: a.rating,
      quando: a.relativePublishTimeDescription || '',
      texto: a.text?.text || a.originalText?.text || '',
      link: a.googleMapsUri || null,
    }));

    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400');
    return res.status(200).json({
      configurado: true,
      nome: lugar.displayName?.text,
      nota: lugar.rating ?? null,
      total: lugar.userRatingCount ?? 0,
      mapsUrl: lugar.googleMapsUri,
      avaliarUrl: lugar.id ? `https://search.google.com/local/writereview?placeid=${lugar.id}` : null,
      avaliacoes,
    });
  } catch (erro) {
    console.error(erro);
    res.setHeader('Cache-Control', 's-maxage=60');
    return res.status(200).json({ configurado: true, erro: true });
  }
}
