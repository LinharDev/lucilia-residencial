export const site = {
  name: 'Lucília Residencial',
  url: 'https://residenciallucilia.com.br',
  description:
    'Apartamentos por temporada de 1, 2 e 3 quartos a 250 metros da Praia da Pinheira, em Palhoça, SC. Ar-condicionado, Wi-Fi e garagem coberta. Aberto o ano todo.',
  phoneDisplay: '(51) 98907-8845',
  phoneE164: '+5551989078845',
  instagram: 'https://www.instagram.com/luciliaresidencial/',
  instagramHandle: '@luciliaresidencial',
  city: 'Palhoça',
  neighborhood: 'Praia da Pinheira',
  state: 'SC',
  // Dados públicos do perfil no Google Maps
  street: 'Servidão Canto das Amendoeiras, 51',
  district: 'Enseada da Pinheira',
  postalCode: '88139-419',
  geo: { lat: -27.8875831, lng: -48.5941291 },
  mapsUrl: 'https://maps.google.com/?cid=5325784994166876222',
  mapsEmbed:
    'https://maps.google.com/maps?q=' +
    encodeURIComponent('Lucília Residencial, Serv. Canto das Amendoeiras, 51 - Enseada da Pinheira, Palhoça - SC') +
    '&z=16&output=embed',
};

const message = 'Olá! Vim pelo site e gostaria de consultar datas e valores no Lucília Residencial.';
export const whatsappUrl = `https://wa.me/5551989078845?text=${encodeURIComponent(message)}`;
