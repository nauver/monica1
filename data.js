/* ===========================================================================
   Built locally — data layer
   Content condensed from the European Committee of the Regions' EU Annual
   Report on the State of Regions and Cities 2026. CC BY 4.0 unless noted.
   =========================================================================== */

// Thematic clusters used across the whole experience (color + icon system)
const CLUSTERS = {
  economy:   { label: { en: 'Economy & jobs',       fr: 'Économie et emplois' },       color: '#f07b00', icon: 'briefcase' },
  rural:     { label: { en: 'Rural & land',         fr: 'Rural et territoires' },      color: '#7aa23a', icon: 'wheat'     },
  climate:   { label: { en: 'Climate & resilience', fr: 'Climat et résilience' },     color: '#00a3a6', icon: 'wave'      },
  housing:   { label: { en: 'Housing',              fr: 'Logement' },                  color: '#8f4b93', icon: 'home'      },
  democracy: { label: { en: 'Democracy & trust',    fr: 'Démocratie et confiance' },  color: '#4a79c7', icon: 'voice'     },
  finance:   { label: { en: 'Local finance',        fr: 'Finances locales' },          color: '#ffb547', icon: 'coin'      },
  demography:{ label: { en: 'Demography',           fr: 'Démographie' },               color: '#d8577a', icon: 'people'    },
  security:  { label: { en: 'Security & defence',   fr: 'Sécurité et défense' },      color: '#5a6b7a', icon: 'shield'    }
};

/* ---------- 10 headline signals (ordered by cluster for rhythm) ---------- */
const SIGNALS = [
  { id:'s1',  value:'30M',         label:{ en:'Europeans depend on manufacturing jobs',                           fr:'Européens dépendent de l’industrie manufacturière' },        cluster:'economy',    source:'p. 6 and p. 21',       weight:30 },
  { id:'s2',  value:'51%',         label:{ en:'of EU public investment is undertaken by cities and regions',     fr:'de l’investissement public UE est porté par les régions' },   cluster:'finance',    source:'p. 6 and pp. 71–76',   weight:51 },
  { id:'s3',  value:'€78bn+',      label:{ en:'subnational fiscal gap in 2025',                                   fr:'déficit budgétaire infranational en 2025' },                 cluster:'finance',    source:'pp. 71–76',             weight:78 },
  { id:'s4',  value:'6.4M',        label:{ en:'farms could be lost by 2040',                                      fr:'exploitations agricoles pourraient disparaître d’ici 2040' },cluster:'rural',      source:'p. 6 and pp. 28–34',   weight:64 },
  { id:'s5',  value:'€2.4tn',      label:{ en:'cumulative climate-related losses projected for 2031–2050',       fr:'pertes climatiques cumulées projetées sur 2031–2050' },      cluster:'climate',    source:'p. 6 and pp. 36–48',   weight:90 },
  { id:'s6',  value:'1 in 10',     label:{ en:'EU citizens face a housing affordability challenge',               fr:'citoyens UE confronté à un problème de logement' },          cluster:'housing',    source:'p. 6 and pp. 50–56',   weight:10 },
  { id:'s7',  value:'1.3M',        label:{ en:'people in the EU experience homelessness',                         fr:'personnes sans-abri dans l’UE' },                             cluster:'housing',    source:'pp. 50–55',             weight:40 },
  { id:'s8',  value:'8 in 10',     label:{ en:'local elected representatives report democratic pressure',         fr:'élus locaux signalent des pressions démocratiques' },         cluster:'democracy',  source:'p. 6 and pp. 65–70',   weight:80 },
  { id:'s9',  value:'3 in 4',      label:{ en:'regions are expected to lose population by 2050',                  fr:'régions devraient perdre de la population d’ici 2050' },     cluster:'demography', source:'p. 6 and pp. 77–82',   weight:75 },
  { id:'s10', value:'135M',        label:{ en:'Europeans live in regions trapped in stagnation or decline',       fr:'Européens vivent dans des régions en stagnation ou déclin' },cluster:'demography', source:'p. 6 and pp. 77–82',   weight:85 }
];

/* ---------- 20 local stories, with coordinates for the Europe map ---------- */
const STORIES = [
  { id:'carinthia',       place:{ en:'Carinthia, Austria',                 fr:'Carinthie, Autriche' },                  cluster:'economy',    coords:[46.63,14.31],
    title:{ en:'A regional cluster makes EU support usable',               fr:'Un cluster régional rend l’aide UE utilisable' },
    problem:{ en:'SMEs lacked time and resources to navigate complex applications.', fr:'Les PME manquaient de temps et de ressources pour naviguer dans des dossiers complexes.' },
    action:{ en:'The SILICON ALPS Cluster combined audits, tailored plans, cascade funding and direct consultancy.', fr:'Le cluster SILICON ALPS a combiné audits, plans sur mesure, financement en cascade et conseil direct.' },
    result:{ en:'More than 140 electronics companies joined the ecosystem.', fr:'Plus de 140 entreprises d’électronique ont rejoint l’écosystème.' },
    metric:{ value:'140+', unit:{ en:'companies', fr:'entreprises' }, kind:'companies' },
    page:'20' },

  { id:'west-pomerania',  place:{ en:'West Pomerania, Poland',             fr:'Poméranie-Occidentale, Pologne' },       cluster:'economy',    coords:[53.43,14.55],
    title:{ en:'Training follows business demand',                         fr:'La formation suit la demande des entreprises' },
    problem:{ en:'SMEs faced skills gaps from the green and digital transitions.', fr:'Les PME faisaient face à des manques de compétences liés aux transitions verte et numérique.' },
    action:{ en:'Businesses choose services from a national database while a regional agency guides the process.', fr:'Les entreprises choisissent dans une base nationale, une agence régionale guide le processus.' },
    result:{ en:'1,220 SMEs and 4,583 employees supported.',               fr:'1 220 PME et 4 583 salariés accompagnés.' },
    metric:{ value:'4,583', unit:{ en:'employees supported', fr:'salariés accompagnés' }, kind:'people' },
    page:'21' },

  { id:'matosinhos',      place:{ en:'Matosinhos, Portugal',               fr:'Matosinhos, Portugal' },                 cluster:'climate',    coords:[41.18,-8.69],
    title:{ en:'Ten municipalities turn waste into shared electricity',   fr:'Dix communes transforment les déchets en électricité partagée' },
    problem:{ en:'Energy costs rose while non-recyclable waste remained underused.', fr:'Les coûts de l’énergie montaient pendant que les déchets non recyclables restaient sous-utilisés.' },
    action:{ en:'ENNO built a renewable-energy community across ten municipalities.', fr:'ENNO a bâti une communauté d’énergie renouvelable sur dix communes.' },
    result:{ en:'Around 160 GWh distributed each year.',                   fr:'Environ 160 GWh distribués par an.' },
    metric:{ value:'160', unit:{ en:'GWh / year', fr:'GWh / an' }, kind:'energy' },
    page:'27' },

  { id:'kosice',          place:{ en:'Košice, Slovakia',                   fr:'Košice, Slovaquie' },                    cluster:'economy',    coords:[48.72,21.26],
    title:{ en:'Brain drain becomes an innovation valley',                 fr:'La fuite des cerveaux devient une vallée d’innovation' },
    problem:{ en:'Young talent left a post-industrial region.',            fr:'Les jeunes talents quittaient une région post-industrielle.' },
    action:{ en:'The region, city and three universities created an innovation ecosystem.', fr:'La région, la ville et trois universités ont créé un écosystème d’innovation.' },
    result:{ en:'Nearly EUR 12 million followed, with EU recognition.',    fr:'Près de 12 millions € ont suivi, avec reconnaissance européenne.' },
    metric:{ value:'€12M', unit:{ en:'investment attracted', fr:'investissement attiré' }, kind:'money' },
    page:'27' },

  { id:'castilla',        place:{ en:'Castilla-La Mancha, Spain',          fr:'Castille-La Manche, Espagne' },          cluster:'rural',      coords:[39.86,-4.03],
    title:{ en:'Young people choose farming',                              fr:'Les jeunes choisissent l’agriculture' },
    problem:{ en:'Farmers were ageing and continuity was at risk.',        fr:'Les agriculteurs vieillissaient, la continuité était menacée.' },
    action:{ en:'Five rounds of support combined fast payments and digital-skills training.', fr:'Cinq vagues d’aide ont combiné paiements rapides et formation au numérique.' },
    result:{ en:'More than 5,300 young farmers entered the sector.',       fr:'Plus de 5 300 jeunes agriculteurs ont rejoint le secteur.' },
    metric:{ value:'5,300+', unit:{ en:'young farmers', fr:'jeunes agriculteurs' }, kind:'people' },
    page:'33' },

  { id:'nouvelle-aquitaine', place:{ en:'Nouvelle-Aquitaine, France',      fr:'Nouvelle-Aquitaine, France' },           cluster:'rural',      coords:[44.84,-0.58],
    title:{ en:'A cooperative doubles production',                         fr:'Une coopérative double sa production' },
    problem:{ en:'A rural manufacturer could not meet demand and risked closure.', fr:'Un fabricant rural ne pouvait pas répondre à la demande et risquait la fermeture.' },
    action:{ en:'EUR 1.86 million in ERDF funding expanded workshop and research capacity.', fr:'1,86 million € de FEDER ont étendu les capacités d’atelier et de recherche.' },
    result:{ en:'Production doubled and 160 jobs are expected within five years.', fr:'Production doublée, 160 emplois attendus en cinq ans.' },
    metric:{ value:'160', unit:{ en:'jobs expected', fr:'emplois attendus' }, kind:'jobs' },
    page:'33' },

  { id:'jelenia-liberec', place:{ en:'Jelenia Góra & Liberec',             fr:'Jelenia Góra et Liberec' },              cluster:'security',   coords:[50.83,15.4],
    title:{ en:'Emergency teams train across borders',                     fr:'Les équipes de secours s’entraînent au-delà des frontières' },
    problem:{ en:'Fire and flooding exposed gaps in Polish-Czech cooperation.', fr:'Les incendies et inondations ont révélé des manques dans la coopération polono-tchèque.' },
    action:{ en:'Interreg supported joint forest-fire, flood and medical training.', fr:'Interreg a soutenu des entraînements communs feux de forêt, inondations et médical.' },
    result:{ en:'Around 1,150 firefighters and medics trained together.',  fr:'Environ 1 150 pompiers et secouristes formés ensemble.' },
    metric:{ value:'1,150', unit:{ en:'personnel trained', fr:'personnes formées' }, kind:'people' },
    page:'41' },

  { id:'lisbon',          place:{ en:'Lisbon, Portugal',                   fr:'Lisbonne, Portugal' },                   cluster:'climate',    coords:[38.72,-9.14],
    title:{ en:'Underground tunnels tame floods',                          fr:'Des tunnels souterrains apprivoisent les crues' },
    problem:{ en:'Extreme rainfall repeatedly caused destructive flash floods.', fr:'Des pluies extrêmes causaient régulièrement des crues éclair destructrices.' },
    action:{ en:'The city built drainage tunnels, anti-pollution basins and pumping stations.', fr:'La ville a bâti tunnels de drainage, bassins anti-pollution et stations de pompage.' },
    result:{ en:'Flood risk is expected to fall by up to 80%.',            fr:'Le risque d’inondation devrait baisser jusqu’à 80 %.' },
    metric:{ value:'-80%', unit:{ en:'flood risk', fr:'risque de crue' }, kind:'reduction' },
    page:'41' },

  { id:'saint-omer',      place:{ en:'Saint-Omer, France',                 fr:'Saint-Omer, France' },                   cluster:'climate',    coords:[50.75,2.25],
    title:{ en:'A school playground is redesigned for heat',               fr:'Une cour d’école repensée pour la chaleur' },
    problem:{ en:'A fully paved playground intensified summer heat.',      fr:'Une cour entièrement bétonnée intensifiait la chaleur estivale.' },
    action:{ en:'The city removed asphalt, added permeable ground, shade and trees.', fr:'La ville a retiré l’asphalte, ajouté sol perméable, ombre et arbres.' },
    result:{ en:'The pilot guides plans for other schools.',               fr:'Le pilote guide les plans pour d’autres écoles.' },
    metric:{ value:'1', unit:{ en:'pilot scaled up', fr:'pilote généralisé' }, kind:'pilot' },
    page:'48' },

  { id:'ebeltoft',        place:{ en:'Ebeltoft, Denmark',                  fr:'Ebeltoft, Danemark' },                   cluster:'climate',    coords:[56.19,10.68],
    title:{ en:'Flood defence becomes public space',                       fr:'La défense anti-crue devient espace public' },
    problem:{ en:'A harbourfront was exposed to sea-level rise.',          fr:'Un front portuaire était exposé à la montée des eaux.' },
    action:{ en:'A climate-resilient park combined coastal planting, bathing and event spaces.', fr:'Un parc climato-résilient combine plantations côtières, baignade et espaces événementiels.' },
    result:{ en:'Protection now supports recreation, culture and biodiversity.', fr:'La protection soutient aujourd’hui loisirs, culture et biodiversité.' },
    metric:{ value:'1', unit:{ en:'climate park', fr:'parc climatique' }, kind:'pilot' },
    page:'48' },

  { id:'barcelona',       place:{ en:'Barcelona, Spain',                   fr:'Barcelone, Espagne' },                   cluster:'housing',    coords:[41.39,2.17],
    title:{ en:'Renovation cuts energy poverty',                           fr:'La rénovation réduit la précarité énergétique' },
    problem:{ en:'Older homes created high bills, poor comfort and health risks.', fr:'Les logements anciens engendraient factures élevées, inconfort et risques sanitaires.' },
    action:{ en:'The city aligned municipal, consortium and NextGenerationEU funding.', fr:'La ville a aligné financements municipaux, consortium et NextGenerationEU.' },
    result:{ en:'11,600 homes renovated, with energy demand down 50% on average.', fr:'11 600 logements rénovés, demande énergétique en baisse de 50 % en moyenne.' },
    metric:{ value:'11,600', unit:{ en:'homes renovated', fr:'logements rénovés' }, kind:'homes' },
    page:'55' },

  { id:'cork',            place:{ en:'Cork, Ireland',                      fr:'Cork, Irlande' },                        cluster:'housing',    coords:[51.90,-8.47],
    title:{ en:'Residents shape urban regeneration',                       fr:'Les habitants façonnent la régénération urbaine' },
    problem:{ en:'Vacancy and dereliction threatened a historic neighbourhood.', fr:'Vacance et abandon menaçaient un quartier historique.' },
    action:{ en:'Surveys, workshops and youth and disability forums shaped a shared plan.', fr:'Enquêtes, ateliers et forums jeunesse et handicap ont nourri un plan partagé.' },
    result:{ en:'EUR 7 million in ERDF THRIVE funding was awarded.',       fr:'7 millions € de FEDER THRIVE ont été accordés.' },
    metric:{ value:'€7M', unit:{ en:'ERDF funding', fr:'financement FEDER' }, kind:'money' },
    page:'55' },

  { id:'murcia',          place:{ en:'Murcia, Spain',                      fr:'Murcie, Espagne' },                      cluster:'security',   coords:[37.98,-1.13],
    title:{ en:'Naval heritage becomes an innovation hub',                 fr:'Le patrimoine naval devient hub d’innovation' },
    problem:{ en:'SMEs struggled with certification, procurement and EU funding.', fr:'Les PME peinaient avec certification, marchés publics et financements UE.' },
    action:{ en:'CAETRA offered R&D support, technology transfer and value-chain access.', fr:'CAETRA a offert soutien R&D, transfert de technologie et accès à la chaîne de valeur.' },
    result:{ en:'130 companies joined and 77 SMEs gained certification readiness.', fr:'130 entreprises rejointes, 77 PME prêtes pour la certification.' },
    metric:{ value:'130', unit:{ en:'companies joined', fr:'entreprises rejointes' }, kind:'companies' },
    page:'62' },

  { id:'occitanie',       place:{ en:'Occitanie, France',                  fr:'Occitanie, France' },                    cluster:'security',   coords:[43.60,1.44],
    title:{ en:'Civilian drones strengthen resilience',                    fr:'Les drones civils renforcent la résilience' },
    problem:{ en:'An emerging drone technology initially lacked backing.',  fr:'Une technologie de drones émergente manquait initialement de soutien.' },
    action:{ en:'The region invested in ecosystem building and a dedicated strategy.', fr:'La région a investi dans la construction d’écosystème et une stratégie dédiée.' },
    result:{ en:'The company now employs 200 people and exports 75% of output.', fr:'L’entreprise emploie désormais 200 personnes et exporte 75 % de sa production.' },
    metric:{ value:'200', unit:{ en:'jobs created', fr:'emplois créés' }, kind:'jobs' },
    page:'62' },

  { id:'bologna',         place:{ en:'Bologna, Italy',                     fr:'Bologne, Italie' },                      cluster:'democracy',  coords:[44.49,11.34],
    title:{ en:'A permanent civic table connects Europe locally',          fr:'Une table civique permanente reconnecte l’Europe au local' },
    problem:{ en:'Local organisations worked separately and EU policy felt distant.', fr:'Les organisations locales travaillaient séparément et la politique UE paraissait lointaine.' },
    action:{ en:'Tavolo Europa was co-designed as a participatory platform.', fr:'Tavolo Europa a été co-conçue comme plateforme participative.' },
    result:{ en:'More than 50 applicant organisations helped shape the platform.', fr:'Plus de 50 organisations candidates ont façonné la plateforme.' },
    metric:{ value:'50+', unit:{ en:'civic organisations', fr:'organisations civiques' }, kind:'companies' },
    page:'69' },

  { id:'harghita',        place:{ en:'Harghita County, Romania',           fr:'Comté de Harghita, Roumanie' },         cluster:'democracy',  coords:[46.36,25.80],
    title:{ en:'A civic broadcast fights a media desert',                  fr:'Une émission civique combat le désert médiatique' },
    problem:{ en:'The area lost county-level television and independent local coverage.', fr:'La zone a perdu la télévision départementale et la couverture locale indépendante.' },
    action:{ en:'A weekly live broadcast joined experts and community voices.', fr:'Une émission hebdomadaire en direct réunit experts et voix communautaires.' },
    result:{ en:'The programme passed 276 consecutive episodes.',          fr:'L’émission a dépassé 276 épisodes consécutifs.' },
    metric:{ value:'276', unit:{ en:'episodes aired', fr:'épisodes diffusés' }, kind:'count' },
    page:'70' },

  { id:'warsaw',          place:{ en:'Warsaw, Poland',                     fr:'Varsovie, Pologne' },                    cluster:'finance',    coords:[52.23,21.01],
    title:{ en:'Seventy-nine municipalities share one vision',             fr:'Soixante-dix-neuf communes partagent une vision' },
    problem:{ en:'The metropolitan area lacked a formal governance tier.', fr:'L’aire métropolitaine manquait d’un échelon de gouvernance formel.' },
    action:{ en:'Local governments co-drafted a 2040 strategy through consultation.', fr:'Les collectivités ont co-rédigé une stratégie 2040 par consultation.' },
    result:{ en:'More than EUR 31 million supports integrated investment.',fr:'Plus de 31 millions € soutiennent l’investissement intégré.' },
    metric:{ value:'€31M+', unit:{ en:'joint investment', fr:'investissement conjoint' }, kind:'money' },
    page:'75' },

  { id:'lazio',           place:{ en:'Lazio, Italy',                       fr:'Latium, Italie' },                       cluster:'finance',    coords:[41.90,12.49],
    title:{ en:'Small loans unlock local enterprise',                      fr:'De petits prêts libèrent l’entreprise locale' },
    problem:{ en:'Small entrepreneurs could not access financing.',        fr:'Les petits entrepreneurs ne pouvaient pas accéder au financement.' },
    action:{ en:'The region created interest-free loans of EUR 10,000 to EUR 50,000.', fr:'La région a créé des prêts sans intérêt de 10 000 à 50 000 €.' },
    result:{ en:'Evaluation confirmed growth impact and inspired new programmes.', fr:'L’évaluation a confirmé l’impact de croissance et inspiré de nouveaux programmes.' },
    metric:{ value:'€10-50k', unit:{ en:'per loan', fr:'par prêt' }, kind:'money' },
    page:'76' },

  { id:'madrid',          place:{ en:'Community of Madrid, Spain',         fr:'Communauté de Madrid, Espagne' },        cluster:'demography', coords:[40.42,-3.70],
    title:{ en:'Fourteen measures revive small villages',                  fr:'Quatorze mesures ravivent les petits villages' },
    problem:{ en:'Population concentrated in the capital and metropolitan belt.', fr:'La population se concentrait dans la capitale et la ceinture métropolitaine.' },
    action:{ en:'Pueblos con Vida invested in housing, jobs and essential services.', fr:'Pueblos con Vida a investi dans logement, emplois et services essentiels.' },
    result:{ en:'Municipalities below 5,000 people grew 14%.',             fr:'Les communes de moins de 5 000 habitants ont grandi de 14 %.' },
    metric:{ value:'+14%', unit:{ en:'small village growth', fr:'croissance petits villages' }, kind:'growth' },
    page:'81' },

  { id:'prachatice',      place:{ en:'Prachatice, Czechia',                fr:'Prachatice, Tchéquie' },                 cluster:'democracy',  coords:[49.01,14.00],
    title:{ en:'Participation becomes a reason to stay',                   fr:'La participation devient une raison de rester' },
    problem:{ en:'Local government risked losing touch with different generations.', fr:'Le gouvernement local risquait de perdre le contact avec les différentes générations.' },
    action:{ en:'Student, senior and disability councils linked participation to budgets.', fr:'Conseils étudiants, seniors et handicap ont lié participation et budgets.' },
    result:{ en:'Resident ideas became projects including a barrier-free map.', fr:'Les idées des habitants sont devenues des projets, dont une carte sans obstacle.' },
    metric:{ value:'3', unit:{ en:'citizen councils', fr:'conseils citoyens' }, kind:'count' },
    page:'82' }
];

/* ---------- 10 themes with headline stat + policy asks ---------- */
const THEMES = [
  { id:'single-market', cluster:'economy',    name:{ en:'Single market & trade',       fr:'Marché unique et commerce' },
    stat:'61.4%', line:{ en:'of goods trade stays within the EU', fr:'du commerce de biens reste dans l’UE' },
    context:{ en:'The single market creates prosperity, but territorial barriers and uneven exposure remain.', fr:'Le marché unique crée de la prospérité, mais barrières territoriales et expositions inégales demeurent.' },
    asks:{ en:['Include local and regional authorities in single-market governance.','Use territorial impact assessments for trade disruption.','Improve export readiness for SMEs and producers.'],
           fr:['Inclure les collectivités locales et régionales dans la gouvernance du marché unique.','Appliquer des évaluations d’impact territorial pour les perturbations commerciales.','Améliorer la préparation à l’export des PME et producteurs.'] } },
  { id:'innovation',    cluster:'economy',    name:{ en:'Industry, innovation & energy', fr:'Industrie, innovation et énergie' },
    stat:'47.3%', line:{ en:'of electricity was produced from renewable sources in 2025', fr:'de l’électricité provenait du renouvelable en 2025' },
    context:{ en:'Industrial transformation depends on regional skills, energy systems and innovation ecosystems.', fr:'La transformation industrielle dépend des compétences régionales, systèmes énergétiques et écosystèmes d’innovation.' },
    asks:{ en:['Guide investment through a place-based approach.','Support industrial decarbonisation and grid modernisation.','Build inclusive just-transition support.'],
           fr:['Orienter l’investissement par une approche territoriale.','Soutenir la décarbonation industrielle et la modernisation des réseaux.','Construire un accompagnement inclusif à la transition juste.'] } },
  { id:'rural',         cluster:'rural',      name:{ en:'Rural development',           fr:'Développement rural' },
    stat:'10.7%', line:{ en:'of EU farmers are under 40', fr:'des agriculteurs UE ont moins de 40 ans' },
    context:{ en:'Rural areas cover most EU territory while facing demographic, service and innovation gaps.', fr:'Les zones rurales couvrent la majeure partie du territoire UE tout en faisant face à des écarts démographiques, de services et d’innovation.' },
    asks:{ en:['Secure identifiable rural resources after 2027.','Reserve support for young farmers and new entrants.','Strengthen rural proofing and LEADER-style delivery.'],
           fr:['Garantir des ressources rurales identifiables après 2027.','Réserver un soutien aux jeunes agriculteurs et nouveaux entrants.','Renforcer le rural proofing et la logique LEADER.'] } },
  { id:'preparedness',  cluster:'security',   name:{ en:'Crisis preparedness',         fr:'Préparation aux crises' },
    stat:'€69bn', line:{ en:'estimated annual need for disaster prevention', fr:'besoin annuel estimé pour la prévention des catastrophes' },
    context:{ en:'Preparedness is first tested locally, where essential services and infrastructure operate.', fr:'La préparation se teste d’abord localement, là où opèrent services essentiels et infrastructures.' },
    asks:{ en:['Integrate regions in prevention, response and recovery.','Invest in administrative capacity and shared exercises.','Recognise volunteers and community organisations structurally.'],
           fr:['Intégrer les régions dans la prévention, la réponse et le relèvement.','Investir dans la capacité administrative et les exercices communs.','Reconnaître structurellement les bénévoles et organisations communautaires.'] } },
  { id:'climate',       cluster:'climate',    name:{ en:'Climate, environment & water', fr:'Climat, environnement et eau' },
    stat:'€2.35', line:{ en:'generated for every euro invested in water resilience', fr:'générés pour chaque euro investi dans la résilience hydrique' },
    context:{ en:'Climate and water risks affect health, infrastructure, economic security and cohesion differently by territory.', fr:'Les risques climatiques et hydriques affectent santé, infrastructures, sécurité économique et cohésion différemment selon les territoires.' },
    asks:{ en:['Provide predictable climate funding.','Restore ecosystems and nature-based infrastructure.','Improve interoperable data and real-time monitoring.'],
           fr:['Fournir un financement climatique prévisible.','Restaurer les écosystèmes et infrastructures fondées sur la nature.','Améliorer les données interopérables et le suivi en temps réel.'] } },
  { id:'housing',       cluster:'housing',    name:{ en:'Housing',                     fr:'Logement' },
    stat:'48M',   line:{ en:'Europeans cannot keep their homes warm', fr:'Européens ne parviennent pas à chauffer leur logement' },
    context:{ en:'Housing affects mobility, opportunity, attractiveness and the right to stay.', fr:'Le logement affecte mobilité, opportunité, attractivité et droit de rester.' },
    asks:{ en:['Enable place-based housing measures.','Expand affordable and social housing systems.','Support renovation, adaptive reuse and technical capacity.'],
           fr:['Permettre des mesures de logement territorialisées.','Étendre les systèmes de logement abordable et social.','Soutenir la rénovation, le réemploi et la capacité technique.'] } },
  { id:'security',      cluster:'security',   name:{ en:'Security & defence',          fr:'Sécurité et défense' },
    stat:'633,000', line:{ en:'direct defence-industry jobs in 2024', fr:'emplois directs dans l’industrie de défense en 2024' },
    context:{ en:'Security now involves local infrastructure, supply chains, public services and civilian resilience.', fr:'La sécurité implique désormais infrastructures locales, chaînes d’approvisionnement, services publics et résilience civile.' },
    asks:{ en:['Recognise regions in security governance.','Fund dual-use infrastructure with civilian benefits.','Build regional defence ecosystems and supply chains.'],
           fr:['Reconnaître les régions dans la gouvernance de sécurité.','Financer des infrastructures à double usage à bénéfice civil.','Construire des écosystèmes et chaînes d’approvisionnement régionaux de défense.'] } },
  { id:'democracy',     cluster:'democracy',  name:{ en:'Local democracy',             fr:'Démocratie locale' },
    stat:'63%',   line:{ en:'trust local and regional authorities', fr:'font confiance aux autorités locales et régionales' },
    context:{ en:'Harassment, disinformation and shrinking civic space threaten democracy closest to citizens.', fr:'Harcèlement, désinformation et réduction de l’espace civique menacent la démocratie la plus proche des citoyens.' },
    asks:{ en:['Protect local political actors.','Fund local media, participation and resilience.','Provide tools against AI-enabled manipulation.'],
           fr:['Protéger les acteurs politiques locaux.','Financer médias locaux, participation et résilience.','Fournir des outils contre la manipulation facilitée par l’IA.'] } },
  { id:'finance',       cluster:'finance',    name:{ en:'Local finance',               fr:'Finances locales' },
    stat:'1 in 3', line:{ en:'euros of public spending is managed locally or regionally', fr:'euros de dépense publique est géré localement ou régionalement' },
    context:{ en:'Investment responsibilities are rising while transfers and fiscal space are under pressure.', fr:'Les responsabilités d’investissement augmentent pendant que transferts et marges budgétaires sont sous pression.' },
    asks:{ en:['Preserve cohesion policy after 2027.','Monitor unfunded mandates and fiscal balance.','Explore locally rooted revenue with redistribution.'],
           fr:['Préserver la politique de cohésion après 2027.','Surveiller mandats non financés et équilibre budgétaire.','Explorer des recettes enracinées localement avec redistribution.'] } },
  { id:'demography',    cluster:'demography', name:{ en:'Demography & right to stay',  fr:'Démographie et droit de rester' },
    stat:'1.2M+', line:{ en:'health professionals are missing across Europe', fr:'professionnels de santé manquent à travers l’Europe' },
    context:{ en:'Population decline, service access and job concentration reinforce one another.', fr:'Déclin démographique, accès aux services et concentration de l’emploi se renforcent mutuellement.' },
    asks:{ en:['Invest in services, jobs, housing and connectivity.','Engage local authorities in future funding plans.','Apply territorial proofing across EU policymaking.'],
           fr:['Investir dans services, emplois, logement et connectivité.','Associer les collectivités aux futurs plans de financement.','Appliquer un contrôle territorial à l’ensemble de la politique UE.'] } }
];

/* ---------- Thermometer: seven indicators across 244 NUTS 2 regions ---------- */
const THERMOMETER = [
  { id:'gdp',        pct:34, label:{ en:'GDP per capita (PPS)',         fr:'PIB par habitant (SPA)' },           dir:'improved' },
  { id:'unemp',      pct:48, label:{ en:'Unemployment',                 fr:'Chômage' },                           dir:'worsened' },
  { id:'poverty',    pct:52, label:{ en:'Poverty or social exclusion',  fr:'Pauvreté ou exclusion sociale' },     dir:'worsened' },
  { id:'expenses',   pct:46, label:{ en:'Unexpected expenses',          fr:'Dépenses imprévues' },                dir:'worsened' },
  { id:'emissions',  pct:33, label:{ en:'Greenhouse-gas emissions',     fr:'Émissions de gaz à effet de serre' }, dir:'stable'   },
  { id:'oldage',     pct:95, label:{ en:'Old-age dependency',           fr:'Dépendance liée au vieillissement' }, dir:'worsened' },
  { id:'vulnerable', pct:41, label:{ en:'JRC Vulnerability Index',      fr:'Indice de vulnérabilité JRC' },       dir:'worsened' }
];

/* ---------- Report metadata (shared across citation blocks) ---------- */
const REPORT = {
  title: 'The state of regions and cities: EU annual report 2026',
  publisher: 'European Committee of the Regions',
  city: 'Brussels',
  date: 'October 2026',
  reference: 'CdR_0463/10-2026',
  isbn: '978-92-895-4140-4',
  doi: '10.2863/1166719',
  licence: 'CC BY 4.0'
};
