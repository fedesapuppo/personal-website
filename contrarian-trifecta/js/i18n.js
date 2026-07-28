const translations = {
  en: {
    // Toolbar
    'toolbar.title': 'Three-Pillar Analytical Station for Stock Analysis',
    'toolbar.subtitle': 'Contrarian Trifecta',
    'toolbar.allSectors': 'All Sectors',
    'toolbar.searchPlaceholder': 'Search ticker or company...',
    'toolbar.legendLabel': 'Show scoring legend',
    'toolbar.legendTitle': 'Scoring legend & reference',
    'toolbar.themeLabel': 'Toggle theme',
    'toolbar.themeTitle': 'Toggle dark/light theme',

    // Tabs
    'tab.trifecta': 'Trifecta Picks',
    'tab.technical': 'Technical View',
    'tab.fundamentals': 'Fundamentals',
    'tab.sentiment': 'Sentiment Lab',

    // Tab descriptions
    'tabDesc.trifecta': (count) => `<strong>Trifecta Picks</strong> — Top 9 from ${count} analyzed stocks, ranked by combined score: Fundamental (50%), Sentiment (35%), Technical (15%). <em>Emotional</em> = irrational sentiment-driven selloff. <em>Cyclical</em> = economic cycle downturn. <em>Structural</em> = business model concerns.`,
    'tabDesc.technical': (count) => `<strong>Technical View</strong> — ${count} stocks from initial oversold screen. RSI below 30 signals oversold conditions. The 52-week range shows distance from annual highs.`,
    'tabDesc.fundamentals': (fundCount, exclCount) => `<strong>Fundamentals View</strong> — ${fundCount} stocks passed quality gate (${exclCount} excluded). Compares each stock against its sector median. Green up-arrows beat the median; red down-arrows trail it.`,
    'tabDesc.sentiment': (count) => `<strong>Sentiment Lab</strong> — ${count} stocks received AI fear analysis. Each card classifies the selloff type and rates confidence in the contrarian thesis.`,

    // Table common
    'table.noData': 'No data available',
    'table.noDataSub': 'Run the pipeline to generate data.',
    'table.stocks': (n) => `${n} stock${n !== 1 ? 's' : ''}`,

    // Ratings
    'rating.highConviction': 'High Conviction',
    'rating.moderate': 'Moderate',
    'rating.watchList': 'Watch List',
    'rating.lowConviction': 'Low Conviction',
    'rating.fearJustified': 'Fear Justified',

    // Trifecta
    'trifecta.empty': 'No stocks match current filters.',
    'trifecta.remaining': (n) => `Remaining ${n} stocks`,
    'trifecta.catalyst': 'Catalyst:',
    'trifecta.col.rank': 'Rank',
    'trifecta.col.ticker': 'Ticker',
    'trifecta.col.company': 'Company',
    'trifecta.col.sector': 'Sector',
    'trifecta.col.trifecta': 'Trifecta',
    'trifecta.col.fund': 'Fund.',
    'trifecta.col.sent': 'Sent.',
    'trifecta.col.tech': 'Tech.',
    'trifecta.col.price': 'Price',
    'trifecta.col.rating': 'Rating',
    'trifecta.col.flags': 'Flags',
    'trifecta.pillar.fund': 'Fund',
    'trifecta.pillar.sent': 'Sent',
    'trifecta.pillar.tech': 'Tech',

    // Badges
    'badge.divergence': 'Divergence',
    'badge.preEarnings': 'Pre-Earnings',

    // Technical
    'technical.col.ticker': 'Ticker',
    'technical.col.company': 'Company',
    'technical.col.price': 'Price',
    'technical.col.dayChange': 'Day Change',
    'technical.col.sma20': 'SMA 20 Dist.',
    'technical.col.sma200': 'SMA 200 Dist.',
    'technical.col.rsi': 'RSI (14)',
    'technical.col.high52w': '52W High Dist.',
    'technical.col.range52w': '52W Range Position',
    'technical.col.volume': 'Volume',
    'technical.col.techScore': 'Technical Score',
    'technical.oversold': 'Oversold',
    'technical.overbought': 'Overbought',

    // Fundamentals
    'fundamentals.col.ticker': 'Ticker',
    'fundamentals.col.company': 'Company',
    'fundamentals.col.sector': 'Sector',
    'fundamentals.col.eps': 'EPS (TTM)',
    'fundamentals.col.pe': 'P/E Ratio',
    'fundamentals.col.debtEq': 'Debt / Equity',
    'fundamentals.col.opMargin': 'Operating Margin',
    'fundamentals.col.roe': 'Return on Equity',
    'fundamentals.col.cashYield': 'Cash Yield',
    'fundamentals.col.fundScore': 'Fundamental Score',

    // Sentiment
    'sentiment.empty': 'No sentiment data',
    'sentiment.emptySub': 'Run the pipeline to generate AI analysis.',
    'sentiment.col.ticker': 'Ticker',
    'sentiment.col.company': 'Company',
    'sentiment.col.price': 'Price',
    'sentiment.col.sentiment': 'Sentiment',
    'sentiment.col.classification': 'Classification',
    'sentiment.col.confidence': 'Confidence',
    'sentiment.col.reasoning': 'AI Reasoning',
    'sentiment.col.catalyst': 'Catalyst',
    'sentiment.col.shortFloat': 'Short Float',
    'sentiment.col.target': 'Target',
    'sentiment.excluded': (n) => `Excluded Stocks (${n}) - failed quality gate before AI analysis`,

    // Footer
    'footer.disclaimer': 'This tool is for informational and educational purposes. It does not constitute financial advice or investment recommendations. Consult a professional before making decisions.',
    'footer.attribution': 'Design & development: Federico Sapuppo',
    'footer.contact': 'fedesapuppo@hotmail.com',

    // CTA
    'cta.tagline': 'A screener spots opportunities. An advisor helps you act on them.',

    // Legend
    'legend.title': 'Scoring System Reference',
    'legend.scoreRanges': 'Score Ranges',
    'legend.strongSignal': 'Strong / Bullish signal',
    'legend.moderateSignal': 'Moderate / Neutral signal',
    'legend.weakSignal': 'Weak / Bearish signal',
    'legend.ratingLabels': 'Rating Labels',
    'legend.trifectaPillars': 'Trifecta Pillars',
    'legend.fundamental': 'Fundamental (50%)',
    'legend.fundamentalDesc': 'Sector-relative value & quality metrics',
    'legend.sentiment': 'Sentiment (35%)',
    'legend.sentimentDesc': 'AI-analyzed fear vs. fundamentals mismatch',
    'legend.technical': 'Technical (15%)',
    'legend.technicalDesc': 'Price action floor signals & oversold conditions',
    'legend.badges': 'Badges & Tags',
    'legend.divergenceDesc': 'Two pillar scores differ by 30+ points (potential value trap)',
    'legend.earningsDesc': 'Earnings report upcoming, higher uncertainty',
    'legend.emotionalDesc': 'AI classifies selloff as irrational / sentiment-driven',
    'legend.cyclicalDesc': 'AI classifies selloff as tied to economic cycles',
    'legend.structuralDesc': 'AI classifies selloff as driven by business model concerns',
    'legend.highConfDesc': 'AI has high confidence in its analysis',
    'legend.lowConfDesc': 'AI has low confidence, use caution',
    'legend.technicalIndicators': 'Technical Indicators',
    'legend.oversoldDesc': 'Oversold territory (potential buying signal)',
    'legend.neutralDesc': 'Neutral range',
    'legend.overboughtDesc': 'Overbought territory (caution)',
    'legend.fundamentalArrows': 'Fundamental Arrows',
    'legend.betterThanSector': 'Better than sector',
    'legend.betterDesc': 'Green up-arrow: metric beats sector median',
    'legend.worseThanSector': 'Worse than sector',
    'legend.worseDesc': 'Red down-arrow: metric trails sector median',

    // Backtest
    'tab.backtest': 'Backtest',
    'tabDesc.backtest': '<strong>Backtest</strong> — Historical validation of the Trifecta model. Simulates a January 2020 selection and measures performance against the S&P 500 over 6+ years.',
    'backtest.title': 'Model Validation: January 2020 Backtest',
    'backtest.period': 'January 2, 2020 \u2192 May 1, 2026',
    'backtest.benchmarkLabel': 'Benchmark: S&P 500',
    'backtest.portfolioLabel': 'Trifecta Portfolio (80+ score)',
    'backtest.outperformance': 'Outperformance',
    'backtest.pp': 'percentage points',
    'backtest.contextTitle': 'Market Context: January 2020',
    'backtest.contextPoints': [
      'S&P 500 at all-time highs (~3,258). US market euphoric.',
      'Argentine ADRs crushed 50-70% after August 2019 PASO election shock.',
      'Alberto Fernandez just took office (Dec 10, 2019) — peak fear: capital controls, IMF renegotiation, default risk.',
      'Consensus narrative: "Argentina is uninvestable." Classic unjustified fear on quality businesses.'
    ],
    'backtest.methodTitle': 'How the Model Was Tested',
    'backtest.methodSteps': [
      'Applied the exact same screening criteria used today: below SMA200, RSI < 40, market cap > small cap, volume > 200k daily average.',
      'For Argentina: all geo_argentina stocks enter the pool (per finviz filter), then run through the exclusion gate and scoring pipeline.',
      'Exclusion gate filtered out: YPF (excessive debt under state control), SUPV (marginal current ratio with weak EPS).',
      'Fundamental scoring ranked stocks by sector-relative P/E, debt/equity, operating margin, ROE, cash yield, and dividend signal.',
      'Technical scoring measured distance from 52-week high, RSI depth, SMA200 distance, and double-bottom patterns.',
      'Sentiment scoring assessed the gap between fear narrative ("uninvestable country") and actual business fundamentals — all three picks scored 88-90 (extreme unjustified fear).',
      'Only stocks scoring 80+ on the combined Trifecta (Fund 50% + Sent 35% + Tech 15%) were selected as "High Conviction" picks.'
    ],
    'backtest.picksTitle': 'High Conviction Picks (Trifecta 80+)',
    'backtest.jan2020': 'Jan 2020',
    'backtest.may2026': 'May 2026',
    'backtest.reasonings': {
      GGAL: 'P/E ~4x, ROE >20%, low debt-to-equity. Leading private bank in Argentina trading at extreme discount due to macro fear, not business deterioration.',
      BMA: 'P/E ~5x, most conservative Argentine bank, strong capital ratios, high dividend yield. Sold off purely on country risk, not credit quality.',
      PAM: 'P/E ~6x, diversified energy conglomerate (generation + O&G + transmission), low debt, strong cash flows. Market priced in tariff freeze that couldn\'t last forever.'
    },
    'backtest.resultsTitle': 'Portfolio Performance vs. S&P 500',
    'backtest.resultsSub1': '3 picks, equal weight',
    'backtest.resultsSub2': 'Buy & hold index',
    'backtest.alphaLabel': 'Alpha Generated',
    'backtest.resultsSub3': '~1.9x the market return',
    'backtest.resultsNote': 'Equal-weight portfolio of the 3 High Conviction picks (80+ Trifecta score). Returns are price-only; dividends would add ~15-25pp additional return over this period.',
    'backtest.disclaimerLabel': 'Disclaimer',
    'backtest.disclaimerText': 'This backtest uses approximate January 2020 prices based on post-PASO trading levels. Past performance does not guarantee future results. This is a single-period test, not a statistically significant sample. The model identified these opportunities through systematic scoring — not hindsight selection.',
    'backtest.whyLabel': 'Why it worked',
    'backtest.whyText': 'The PASO crash created a classic "unjustified fear" event — an entire market sold off indiscriminately due to political uncertainty, punishing quality businesses alongside weak ones. The Trifecta model\'s strength is distinguishing companies where fear is rational from those where it creates opportunity.',

    // Month selector
    'month.label': 'Select month',

    // Lang selector
    'lang.label': 'Language',
  },
  es: {
    // Toolbar
    'toolbar.title': 'Estaci\u00f3n Anal\u00edtica de Tres Pilares para Acciones Burs\u00e1tiles',
    'toolbar.subtitle': 'Contrarian Trifecta',
    'toolbar.allSectors': 'Todos los Sectores',
    'toolbar.searchPlaceholder': 'Buscar ticker o empresa...',
    'toolbar.legendLabel': 'Mostrar leyenda de puntuacion',
    'toolbar.legendTitle': 'Leyenda y referencia de puntuacion',
    'toolbar.themeLabel': 'Cambiar tema',
    'toolbar.themeTitle': 'Cambiar tema claro/oscuro',

    // Tabs
    'tab.trifecta': 'Selecciones Trifecta',
    'tab.technical': 'Vista Tecnica',
    'tab.fundamentals': 'Fundamentales',
    'tab.sentiment': 'Lab de Sentimiento',

    // Tab descriptions
    'tabDesc.trifecta': (count) => `<strong>Selecciones Trifecta</strong> — Top 9 de ${count} acciones analizadas, ordenadas por puntuacion combinada: Fundamental (50%), Sentimiento (35%), Tecnico (15%). <em>Emocional</em> = venta irracional impulsada por sentimiento. <em>Ciclico</em> = caida del ciclo economico. <em>Estructural</em> = preocupaciones del modelo de negocio.`,
    'tabDesc.technical': (count) => `<strong>Vista Tecnica</strong> — ${count} acciones del filtro inicial de sobreventa. RSI debajo de 30 indica condiciones de sobreventa. El rango de 52 semanas muestra la distancia desde los maximos anuales.`,
    'tabDesc.fundamentals': (fundCount, exclCount) => `<strong>Vista Fundamentales</strong> — ${fundCount} acciones pasaron el filtro de calidad (${exclCount} excluidas). Compara cada accion contra la mediana de su sector. Flechas verdes superan la mediana; flechas rojas estan por debajo.`,
    'tabDesc.sentiment': (count) => `<strong>Lab de Sentimiento</strong> — ${count} acciones recibieron analisis de miedo por IA. Cada tarjeta clasifica el tipo de venta y califica la confianza en la tesis contrarian.`,

    // Table common
    'table.noData': 'No hay datos disponibles',
    'table.noDataSub': 'Ejecute el pipeline para generar datos.',
    'table.stocks': (n) => `${n} accion${n !== 1 ? 'es' : ''}`,

    // Ratings
    'rating.highConviction': 'Alta Conviccion',
    'rating.moderate': 'Moderada',
    'rating.watchList': 'Lista de Espera',
    'rating.lowConviction': 'Baja Conviccion',
    'rating.fearJustified': 'Miedo Justificado',

    // Trifecta
    'trifecta.empty': 'Ninguna accion coincide con los filtros actuales.',
    'trifecta.remaining': (n) => `${n} acciones restantes`,
    'trifecta.catalyst': 'Catalizador:',
    'trifecta.col.rank': 'Rango',
    'trifecta.col.ticker': 'Ticker',
    'trifecta.col.company': 'Empresa',
    'trifecta.col.sector': 'Sector',
    'trifecta.col.trifecta': 'Trifecta',
    'trifecta.col.fund': 'Fund.',
    'trifecta.col.sent': 'Sent.',
    'trifecta.col.tech': 'Tec.',
    'trifecta.col.price': 'Precio',
    'trifecta.col.rating': 'Calificacion',
    'trifecta.col.flags': 'Alertas',
    'trifecta.pillar.fund': 'Fund',
    'trifecta.pillar.sent': 'Sent',
    'trifecta.pillar.tech': 'Tec',

    // Badges
    'badge.divergence': 'Divergencia',
    'badge.preEarnings': 'Pre-Resultados',

    // Technical
    'technical.col.ticker': 'Ticker',
    'technical.col.company': 'Empresa',
    'technical.col.price': 'Precio',
    'technical.col.dayChange': 'Cambio Diario',
    'technical.col.sma20': 'Dist. SMA 20',
    'technical.col.sma200': 'Dist. SMA 200',
    'technical.col.rsi': 'RSI (14)',
    'technical.col.high52w': 'Dist. Max 52S',
    'technical.col.range52w': 'Posicion Rango 52S',
    'technical.col.volume': 'Volumen',
    'technical.col.techScore': 'Puntuacion Tecnica',
    'technical.oversold': 'Sobrevendido',
    'technical.overbought': 'Sobrecomprado',

    // Fundamentals
    'fundamentals.col.ticker': 'Ticker',
    'fundamentals.col.company': 'Empresa',
    'fundamentals.col.sector': 'Sector',
    'fundamentals.col.eps': 'BPA (UDM)',
    'fundamentals.col.pe': 'Ratio P/G',
    'fundamentals.col.debtEq': 'Deuda / Patrimonio',
    'fundamentals.col.opMargin': 'Margen Operativo',
    'fundamentals.col.roe': 'Retorno s/ Patrimonio',
    'fundamentals.col.cashYield': 'Rend. Efectivo',
    'fundamentals.col.fundScore': 'Puntuacion Fundamental',

    // Sentiment
    'sentiment.empty': 'Sin datos de sentimiento',
    'sentiment.emptySub': 'Ejecute el pipeline para generar analisis de IA.',
    'sentiment.col.ticker': 'Ticker',
    'sentiment.col.company': 'Empresa',
    'sentiment.col.price': 'Precio',
    'sentiment.col.sentiment': 'Sentimiento',
    'sentiment.col.classification': 'Clasificacion',
    'sentiment.col.confidence': 'Confianza',
    'sentiment.col.reasoning': 'Razonamiento IA',
    'sentiment.col.catalyst': 'Catalizador',
    'sentiment.col.shortFloat': 'Short Float',
    'sentiment.col.target': 'Objetivo',
    'sentiment.excluded': (n) => `Acciones Excluidas (${n}) - no pasaron el filtro de calidad antes del analisis de IA`,

    // Footer
    'footer.disclaimer': 'Esta herramienta es informativa y educativa. No constituye asesoramiento financiero ni recomendaci\u00f3n de inversi\u00f3n. Consult\u00e1 a un profesional antes de tomar decisiones.',
    'footer.attribution': 'Dise\u00f1o y desarrollo: Federico Sapuppo',
    'footer.contact': 'fedesapuppo@hotmail.com',

    // CTA
    'cta.tagline': 'Un screener identifica oportunidades. Un asesor te ayuda a actuar sobre ellas.',

    // Legend
    'legend.title': 'Referencia del Sistema de Puntuacion',
    'legend.scoreRanges': 'Rangos de Puntuacion',
    'legend.strongSignal': 'Senal fuerte / alcista',
    'legend.moderateSignal': 'Senal moderada / neutral',
    'legend.weakSignal': 'Senal debil / bajista',
    'legend.ratingLabels': 'Etiquetas de Calificacion',
    'legend.trifectaPillars': 'Pilares Trifecta',
    'legend.fundamental': 'Fundamental (50%)',
    'legend.fundamentalDesc': 'Metricas de valor y calidad relativas al sector',
    'legend.sentiment': 'Sentimiento (35%)',
    'legend.sentimentDesc': 'Desajuste analizado por IA entre miedo y fundamentales',
    'legend.technical': 'Tecnico (15%)',
    'legend.technicalDesc': 'Senales de piso y condiciones de sobreventa',
    'legend.badges': 'Insignias y Etiquetas',
    'legend.divergenceDesc': 'Dos pilares difieren por 30+ puntos (posible trampa de valor)',
    'legend.earningsDesc': 'Reporte de resultados proximo, mayor incertidumbre',
    'legend.emotionalDesc': 'IA clasifica la venta como irracional / impulsada por sentimiento',
    'legend.cyclicalDesc': 'IA clasifica la venta como ligada a ciclos economicos',
    'legend.structuralDesc': 'IA clasifica la venta como impulsada por preocupaciones del modelo de negocio',
    'legend.highConfDesc': 'IA tiene alta confianza en su analisis',
    'legend.lowConfDesc': 'IA tiene baja confianza, proceder con cautela',
    'legend.technicalIndicators': 'Indicadores Tecnicos',
    'legend.oversoldDesc': 'Territorio de sobreventa (posible senal de compra)',
    'legend.neutralDesc': 'Rango neutral',
    'legend.overboughtDesc': 'Territorio de sobrecompra (cautela)',
    'legend.fundamentalArrows': 'Flechas Fundamentales',
    'legend.betterThanSector': 'Mejor que el sector',
    'legend.betterDesc': 'Flecha verde: metrica supera mediana del sector',
    'legend.worseThanSector': 'Peor que el sector',
    'legend.worseDesc': 'Flecha roja: metrica por debajo de mediana del sector',

    // Backtest
    'tab.backtest': 'Backtest',
    'tabDesc.backtest': '<strong>Backtest</strong> — Validacion historica del modelo Trifecta. Simula una seleccion de enero 2020 y mide el rendimiento contra el S&P 500 en 6+ anos.',
    'backtest.title': 'Validacion del Modelo: Backtest Enero 2020',
    'backtest.period': '2 de enero de 2020 \u2192 1 de mayo de 2026',
    'backtest.benchmarkLabel': 'Referencia: S&P 500',
    'backtest.portfolioLabel': 'Portafolio Trifecta (80+ puntos)',
    'backtest.outperformance': 'Rendimiento superior',
    'backtest.pp': 'puntos porcentuales',
    'backtest.contextTitle': 'Contexto de Mercado: Enero 2020',
    'backtest.contextPoints': [
      'S&P 500 en maximos historicos (~3.258). Mercado estadounidense euforico.',
      'ADRs argentinos aplastados 50-70% tras el shock electoral de las PASO de agosto 2019.',
      'Alberto Fernandez recien asumido (10 dic 2019) — miedo maximo: cepo cambiario, renegociacion con el FMI, riesgo de default.',
      'Narrativa de consenso: "Argentina es uninvertible." Clasico miedo injustificado sobre negocios de calidad.'
    ],
    'backtest.methodTitle': 'Como se Probo el Modelo',
    'backtest.methodSteps': [
      'Se aplicaron exactamente los mismos criterios de seleccion usados hoy: por debajo de SMA200, RSI < 40, capitalizacion > small cap, volumen > 200k promedio diario.',
      'Para Argentina: todas las acciones geo_argentina entran al pool (filtro de finviz), luego pasan por el filtro de exclusion y el pipeline de scoring.',
      'El filtro de exclusion descarto: YPF (deuda excesiva bajo control estatal), SUPV (ratio corriente marginal con BPA debil).',
      'El scoring fundamental clasifico acciones por P/E relativo al sector, deuda/patrimonio, margen operativo, ROE, rendimiento de caja y senal de dividendo.',
      'El scoring tecnico midio distancia al maximo de 52 semanas, profundidad del RSI, distancia a SMA200 y patrones de doble piso.',
      'El scoring de sentimiento evaluo la brecha entre la narrativa de miedo ("pais uninvertible") y los fundamentales reales del negocio — las tres selecciones puntuaron 88-90 (miedo injustificado extremo).',
      'Solo las acciones con 80+ puntos en el Trifecta combinado (Fund 50% + Sent 35% + Tec 15%) fueron seleccionadas como "Alta Conviccion".'
    ],
    'backtest.picksTitle': 'Selecciones de Alta Conviccion (Trifecta 80+)',
    'backtest.jan2020': 'Ene 2020',
    'backtest.may2026': 'May 2026',
    'backtest.reasonings': {
      GGAL: 'P/E ~4x, ROE >20%, baja deuda/patrimonio. Banco privado lider en Argentina cotizando con descuento extremo por miedo macro, no por deterioro del negocio.',
      BMA: 'P/E ~5x, banco argentino mas conservador, ratios de capital solidos, alto rendimiento por dividendo. Vendido puramente por riesgo pais, no por calidad crediticia.',
      PAM: 'P/E ~6x, conglomerado energetico diversificado (generacion + O&G + transmision), baja deuda, flujos de caja solidos. El mercado descontaba un congelamiento tarifario que no podia durar para siempre.'
    },
    'backtest.resultsTitle': 'Rendimiento del Portafolio vs. S&P 500',
    'backtest.resultsSub1': '3 selecciones, peso igual',
    'backtest.resultsSub2': 'Comprar y mantener indice',
    'backtest.alphaLabel': 'Alfa Generado',
    'backtest.resultsSub3': '~1.9x el retorno del mercado',
    'backtest.resultsNote': 'Portafolio de peso igualitario con las 3 selecciones de Alta Conviccion (Trifecta 80+). Retornos solo de precio; los dividendos sumarian ~15-25pp de retorno adicional en este periodo.',
    'backtest.disclaimerLabel': 'Aviso Legal',
    'backtest.disclaimerText': 'Este backtest usa precios aproximados de enero 2020 basados en niveles de cotizacion post-PASO. El rendimiento pasado no garantiza resultados futuros. Esta es una prueba de un solo periodo, no una muestra estadisticamente significativa. El modelo identifico estas oportunidades mediante scoring sistematico, no seleccion retrospectiva.',
    'backtest.whyLabel': 'Por que funciono',
    'backtest.whyText': 'El crash de las PASO creo un evento clasico de "miedo injustificado" — un mercado entero vendio indiscriminadamente por incertidumbre politica, castigando negocios de calidad junto con los debiles. La fortaleza del modelo Trifecta es distinguir empresas donde el miedo es racional de aquellas donde crea oportunidad.',

    // Month selector
    'month.label': 'Seleccionar mes',

    // Lang selector
    'lang.label': 'Idioma',
  }
};

const STORAGE_KEY = 'trifecta-lang';
let currentLang = 'en';

export function t(key) {
  const val = translations[currentLang]?.[key] ?? translations.en[key] ?? key;
  return val;
}

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  if (translations[lang]) {
    currentLang = lang;
    sessionStorage.setItem(STORAGE_KEY, lang);
  }
}

export function initLang() {
  const saved = sessionStorage.getItem(STORAGE_KEY);
  if (saved && translations[saved]) {
    currentLang = saved;
  }
}
