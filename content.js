/*
  PERSONALIZE SOMENTE ESTE ARQUIVO.
  Troque os textos entre aspas e os caminhos das fotos.
  Não apague vírgulas, chaves { }, colchetes [ ] ou aspas.
*/

const SITE_CONTENT = {
  pageTitle: "Para Emilly — entre telas, você",
  description: "Uma experiência feita com carinho.",
  siteMark: "para Emilly",

  music: {
    file: "assets/musica/musica.mp3",
    volume: 0.42
  },

  opening: {
    eyebrow: "uma experiência feita só para você",
    title: "Entre todas as distâncias, você chegou até mim.",
    text: "Separe alguns minutos. Não é um pedido e não exige resposta, é apenas um lugar feito para guardar o que você representa para mim.",
    button: "abrir este lugar"
  },

  pages: [
    {
      type: "cover",
      nav: "Capa",
      eyebrow: "para Emilly, com carinho",
      title: "Nós nunca estivemos no mesmo lugar. Ainda assim, você esteve em tantos lugares dentro de mim(la ele).",
      text: "Uma história feita de mensagens, chamadas, fotos, silêncio, cuidado e uma distância que nunca conseguiu tornar o sentimento pequeno.",
      image: "assets/fotos/capa-preto-e-branco.jpg",
      alt: "Foto de capa"
    },
    {
      type: "manifesto",
      nav: "Antes de começar",
      number: "01",
      eyebrow: "antes de começar",
      title: "Isto não é uma tentativa de voltar no tempo.",
      paragraphs: [
        "O começo deste ano mudou o nome da nossa relação, mas não apagou tudo o que existiu entre nós.",
        "Eu fiz este site para reconhecer uma história que foi verdadeira, mesmo acontecendo por uma tela. Para agradecer pela sua presença e pelo amor que ainda existe, agora de uma forma diferente.",
        "Você não precisa responder, decidir nada ou carregar qualquer expectativa. Aqui só existe carinho, memória e verdade."
      ],
      accent: "Algumas histórias terminam. Outras apenas aprendem uma nova forma de existir."
    },
    {
      type: "origin",
      nav: "O começo",
      number: "02",
      eyebrow: "a primeira conexão",
      title: "Tudo começou com uma mensagem.",
      date: "03/03/2025",
      text: "Em um simples jogo, quem diria que eu conheceria a pessoa que mais me surpreenderia? Aquele dia marcou o início de uma história que, mesmo sem encontros ou passeios, se tornou uma das mais importantes da minha vida.",
      quote: "Minha internet caiu, ta chovendo pra cacete.",
      image: "assets/fotos/print-mensagem.jpg",
      alt: "Primeira foto ou print importante"
    },
    {
      type: "messages",
      nav: "Entre mensagens",
      number: "03",
      eyebrow: "de uma tela para o coração",
      title: "A distância tinha quilômetros. A presença, não.",
      text: "Você fez minha vida mais preciosa, eu nunca estive tão feliz.",
      messages: [
        { side: "left", label: "ela", text: "Eu te quero comigo para sempre." },
        { side: "right", label: "você", text: "O que eu mais quero é você comigo por toda a vida." },
        { side: "left", label: "memória", text: "E desde então, não ficamos um dia sem conversar um com o outro, todas as risadas, as emoções e os momentos que guardo no coração." }
      ]
    },
    {
      type: "details",
      nav: "O que eu conheço",
      number: "04",
      eyebrow: "os detalhes que atravessaram a tela",
      title: "Eu conheci você de um jeito que não dependeu de estar perto.",
      intro: "Não tem nada que faça eu me sentir tão bem do que quando estou com você.",
      items: [
        { icon: "01", title: "Sua voz", text: "O jeito que sua voz soa quando está animada, cansada ou tentando esconder que está rindo, tudo isso me encanta." },
        { icon: "02", title: "Seu jeito de escrever", text: "É sempre um 'juro', 'aff', 'tchongo' e as figurinhas mais feias que eu já vi." },
        { icon: "03", title: "A sua força", text: "As diversas vezes que você mostrou coragem, mesmo sendo coisas que ninguem aguentaria." },
        { icon: "04", title: "O seu cuidado", text: "Sempre se preocupou comigo, mesmo quando eu não queria que se preocupasse." },
        { icon: "05", title: "A sua beleza", text: "A sua beleza é mais do que apenas aparência; é a maneira como você vê o mundo e age com os outros. Tudo em você é lindo." },
        { icon: "06", title: "O que você despertou", text: "Voce trouxe o que tinha de melhor em mim, mesmo quando eu estava quebrado." }
      ]
    },
    {
      type: "gallery",
      nav: "Como eu te vejo",
      number: "05",
      eyebrow: "retratos dela",
      title: "Algumas das formas mais bonitas de você existir no meu olhar.",
      text: "Cada detalhe em você importa para mim, tudo em você é lindo.",
      photos: [
        { src: "assets/fotos/foto-no-espelho.jpg", alt: "Descrição da foto 1", eyebrow: "uma das minhas favoritas", title: "Eu me lembro perfeitamente do quanto fiquei admirando ela." },
        { src: "assets/fotos/selfie-senac.jpg", alt: "Descrição da foto 2", eyebrow: "o seu sorriso", title: "O seu sorriso me faz sorrir até hoje." },
        { src: "assets/fotos/foto-divertida.jpg", alt: "Descrição da foto 3", eyebrow: "um instante dela", title: "Eu nunca ri tanto em uma foto antes." },
        { src: "assets/fotos/uniforme-escolar.jpg", alt: "Descrição da foto 4", eyebrow: "do jeito que eu lembro", title: "Sempre foi a mesma menina bobona que eu conheci." },
        { src: "assets/fotos/foto-elegante.jpg", alt: "Descrição da foto 5", eyebrow: "luz", title: "Minha visão de você é sempre iluminada por essa luz contagiante que tem em você." }
      ]
    },
    {
      type: "distance",
      nav: "A distância",
      number: "06",
      eyebrow: "dois lugares, uma história",
      title: "Nunca pude segurar sua mão. Mesmo assim, você alcançou partes de mim que quase ninguém alcançou.",
      text: "Nós não tivemos encontros, passeios ou fotografias juntos. Tivemos presença de outro tipo: a vontade de contar o dia, a espera por uma mensagem, o conforto de uma voz e a sensação de ser compreendido mesmo estando longe.",
      leftLabel: "onde eu estava",
      rightLabel: "onde você estava",
      centerLabel: "o que existiu entre nós"
    },
    {
      type: "memories",
      nav: "O que ficou",
      number: "07",
      eyebrow: "coisas que o tempo não apaga",
      title: "Eu não quero lembrar apenas do final. Quero guardar tudo o que foi bonito no caminho.",
      cards: [
        { date: "04/03/2025", title: "Quando virou amor", text: "Não precisou de muito tempo pra eu começar a perceber o que estava sentindo, desde sempre te amei." },
        { date: "06/03/2025", title: "Uma conversa inesquecível", text: "Desde o dia em que você me disse que me amava, prometi a mim mesmo que meu objetivo seria te fazer feliz." },
        { date: "03/2026", title: "Um momento difícil", text: "Desde aqui, tudo se complicou, infelizmente nos afastamos, mas eu te garanto que nunca deixei de te amar." },
        { date: "Hoje", title: "O carinho que permaneceu", text: "Mesmo não tendo mais a oportunidade de te ter, o carinho e amor que senti por você continua presente e sempre irá continuar." }
      ]
    },
    {
      type: "letter",
      nav: "A carta",
      number: "08",
      eyebrow: "sem cobrança, sem obrigação",
      title: "Uma carta que você pode abrir quando estiver pronta.",
      intro: "O conteúdo só aparece quando você tocar. Não tem problema se não quiser abrir, ou se não quiser ler. O que importa é que essa carta existe, guardando tudo o que eu sinto por você.",
      button: "abrir a carta",
      salutation: "Emilly,",
      paragraphs: [
        "Eu pensei muitas vezes em como começar esta carta, mas nenhuma palavra parece grande o suficiente para explicar tudo o que você representa para mim.",
        "É estranho pensar que nunca estivemos no mesmo lugar, que eu nunca pude segurar sua mão, abraçar você em um dia difícil ou olhar diretamente nos seus olhos sem uma tela entre nós. Mesmo assim, você conseguiu estar presente na minha vida de uma maneira que poucas pessoas estiveram. Você atravessou quilômetros e telas e chegou a lugares dentro de mim que ninguém mais conseguiu alcançar.",
        "O que nós vivemos foi real. Cada conversa, cada ligação, cada risada, cada foto que você me enviou, cada madrugada e até os momentos difíceis fizeram parte de uma história que mudou quem eu sou. A distância nunca tornou o meu sentimento menor. Em muitos momentos, você esteve mais perto de mim do que pessoas que estavam fisicamente ao meu lado.",
        "O começo deste ano mudou a forma da nossa relação, mas não apagou o que existiu entre nós. Não apagou o carinho, a admiração, as lembranças e muito menos o amor que eu sinto por você.",
        "Eu não fiz este site para cobrar uma resposta, pedir que você tome alguma decisão ou colocar algum peso sobre você. Fiz porque precisava transformar em alguma coisa bonita tudo o que sinto quando penso em nós. Queria que você pudesse enxergar, mesmo que por alguns minutos, o quanto foi importante para mim e o quanto continua sendo.",
        "Eu amo os seus cachos, o seu olhar, o seu sorriso, a sua voz e os pequenos detalhes que fazem você ser exatamente quem é. Mas o que mais amo está além das fotos: o seu jeito, a sua sensibilidade, as coisas que você diz sem perceber, a forma como você consegue me fazer sorrir e a pessoa que conheci por trás de tudo isso. ",
        "Você é meu amor, minha companhia, meu conforto e uma parte muito importante da minha vida. Talvez um dia a vida finalmente coloque nós dois no mesmo lugar e nesse dia serei extremamente feliz.",
      ],
      signature: "Com todo o meu carinho,\nLucas"
    },
    {
      type: "final",
      nav: "Para terminar",
      eyebrow: "a última página",
      title: "A tela sempre esteve entre nós. O sentimento, nunca.",
      text: "Obrigado por ter sido amor, companhia e casa mesmo de tão longe. Você continua sendo profundamente importante para mim.",
      small: "Feito com cuidado, amor e especialmente para você.",
      restart: "ver desde o começo"
    }
  ]
};
