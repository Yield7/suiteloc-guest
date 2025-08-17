
import React, { useEffect, useMemo, useState } from "react";

const COLORS = {
  primary: "#2D5BFF",
  ink: "#181a20",
  inkSoft: "#5b6470",
  card: "#ffffff",
  border: "#e6eef9",
  accent: "#00C2A8",
  accent2: "#FF9E2C",
};

const MAD = (n) => new Intl.NumberFormat("fr-MA", { style: "currency", currency: "MAD" }).format(n);

const DB = {
  offers: [
    { id: "late-300", name: "Late Check‑out", price: 300, cat: "Pré‑arrivée" },
    { id: "vip-setup-300", name: "VIP Setup", price: 300, cat: "Pré‑arrivée" },
    { id: "upgrade-any-300", name: "Upgrade Suite (au choix)", price: 300, cat: "Pré‑arrivée" },
    { id: "extra-adult-300", name: "Supplément adulte", price: 300, cat: "Pré‑arrivée" },
  ],
  menu: [
    { cat: "Petit Déjeuner", id: "pdj-marocain-70", name: "PDJ Marocain", price: 70 },
    { cat: "Petit Déjeuner", id: "pdj-paris-90", name: "PDJ Paris", price: 90 },
    { cat: "Petit Déjeuner", id: "pdj-express-50", name: "PDJ Express", price: 50 },
    { cat: "Petit Déjeuner", id: "viennoiseries-40", name: "Sélection de 3 viennoiseries", price: 40 },
    { cat: "Petit Déjeuner", id: "omelette-30", name: "Omelette au choix", price: 30 },
    { cat: "Petit Déjeuner", id: "omelette-charcuterie-35", name: "Omelette à la charcuterie", price: 35 },
    { cat: "Petit Déjeuner", id: "toast-sup-30", name: "Toast supplément", price: 30 },
    { cat: "Petit Déjeuner", id: "bol-cereale-20", name: "Bol de céréale", price: 20 },
    { cat: "Petit Déjeuner", id: "salade-fruits-40", name: "Salade de fruits", price: 40 },

    { cat: "Tapas Marocaines", id: "tapas-briouates-50", name: "Trio de Briouates et Zaalouk", price: 50 },
    { cat: "Tapas Marocaines", id: "tapas-pastilla-60", name: "Mini pastilla poulet et amandes", price: 60 },
    { cat: "Tapas Marocaines", id: "tapas-brochettes-120", name: "Trio brochettes plat Gourmet", price: 120 },
    { cat: "Tapas Marocaines", id: "tapas-kefta-50", name: "Mini‑tajine de kefta aux oeufs", price: 50 },
    { cat: "Tapas Marocaines", id: "tapas-salades-40", name: "Assortiment trio salades marocaines", price: 40 },
    { cat: "Tapas Marocaines", id: "tapas-foie-50", name: "Foie mariné aux oeufs", price: 50 },
    { cat: "Tapas Marocaines", id: "tapas-cervelle-70", name: "Cervelle d'agneau marinée", price: 70 },

    { cat: "Cuisine", id: "tajine-poulet-150", name: "Tajine poulet", price: 150 },
    { cat: "Cuisine", id: "tajine-viande-150", name: "Tajine viande", price: 150 },
    { cat: "Cuisine", id: "tajine-oeuf-khliaa-50", name: "Tagine d'oeuf avec khliaa", price: 50 },
    { cat: "Cuisine", id: "tajine-veg-110", name: "Tajine marocain végétarien", price: 110 },
    { cat: "Cuisine", id: "tanjia-viande-180", name: "Tanjia viande", price: 180 },
    { cat: "Cuisine", id: "tanjia-poulet-180", name: "Tanjia poulet", price: 180 },
    { cat: "Cuisine", id: "rfissa-180", name: "R'Fissa au poulet", price: 180 },
    { cat: "Cuisine", id: "poisson-four-280", name: "Poisson au four", price: 280 },
    { cat: "Cuisine", id: "couscous-150", name: "Couscous", price: 150 },
    { cat: "Cuisine", id: "soupe-60", name: "Soupe", price: 60 },
    { cat: "Cuisine", id: "soupe-mer-70", name: "Soupe fruit de mer", price: 70 },
    { cat: "Cuisine", id: "salade-variee-40", name: "Salade variée", price: 40 },
    { cat: "Cuisine", id: "salade-cesar-50", name: "Salade césar", price: 50 },
    { cat: "Cuisine", id: "legumes-30", name: "Légumes sautés ou frais", price: 30 },
    { cat: "Cuisine", id: "assortiment-fruits-60", name: "Assortiment fruits de saison", price: 60 },
    { cat: "Cuisine", id: "fruits-saison-40", name: "Sélection de fruits de saison", price: 40 },
    { cat: "Cuisine", id: "orange-cannelle-35", name: "Orange aux cannelles", price: 35 },
    { cat: "Cuisine", id: "gratin-legumes-90", name: "Gratin de légumes sauce blanche", price: 90 },
    { cat: "Cuisine", id: "gateau-jour-40", name: "Gâteaux ou tarte du jour", price: 40 },
    { cat: "Cuisine", id: "sandwich-viande-80", name: "Sandwich viande hachée", price: 80 },
    { cat: "Cuisine", id: "sandwich-poulet-80", name: "Sandwich poulet", price: 80 },
    { cat: "Cuisine", id: "sandwich-thon-40", name: "Sandwiche thon", price: 40 },
    { cat: "Cuisine", id: "sandwich-suiteloc-90", name: "Sandwich Suiteloc", price: 90 },
    { cat: "Cuisine", id: "tacos-poulet-80", name: "Tacos poulet", price: 80 },
    { cat: "Cuisine", id: "pizza-100", name: "Pizza", price: 100 },
    { cat: "Cuisine", id: "pates-bolognaise-120", name: "Pâtes bolognaise", price: 120 },
    { cat: "Cuisine", id: "spaghetti-110", name: "Spaghetti au choix", price: 110 },
    { cat: "Cuisine", id: "mkila-viande-50", name: "Mkila viande hachée", price: 50 },
    { cat: "Cuisine", id: "new-york-110", name: "New York", price: 110 },
    { cat: "Cuisine", id: "assiette-taktouka-20", name: "Assiette tektouka ou zaalouk", price: 20 },
    { cat: "Cuisine", id: "frite-15", name: "Frites", price: 15 },
    { cat: "Cuisine", id: "pancake-crepes-30", name: "Pancake / crêpes / cake", price: 30 },
    { cat: "Cuisine", id: "cafe-gourmand-50", name: "Café gourmand", price: 50 },

    { cat: "Collation", id: "twix-30", name: "Twix", price: 30 },
    { cat: "Collation", id: "kitkat-30", name: "Kit Kat", price: 30 },
    { cat: "Collation", id: "maltesers-30", name: "Maltesers", price: 30 },
    { cat: "Collation", id: "mars-30", name: "Mars", price: 30 },
    { cat: "Collation", id: "mms-30", name: "M&M's", price: 30 },
    { cat: "Collation", id: "galaxy-30", name: "Galaxy", price: 30 },
    { cat: "Collation", id: "snickers-30", name: "Snickers", price: 30 },
    { cat: "Collation", id: "milka-30", name: "Milka", price: 30 },
    { cat: "Collation", id: "chips-25", name: "Chips", price: 25 },
    { cat: "Collation", id: "kinder-bueno-30", name: "Kinder Bueno", price: 30 },
    { cat: "Collation", id: "ferrero-rocher-35", name: "Ferrero Rocher", price: 35 },
    { cat: "Collation", id: "rafaello-30", name: "Rafaello", price: 30 },

    { cat: "Boisson", id: "coca-25", name: "Coca-Cola", price: 25 },
    { cat: "Boisson", id: "coca-zero-30", name: "Coca-Cola Zero", price: 30 },
    { cat: "Boisson", id: "sprite-25", name: "Sprite", price: 25 },
    { cat: "Boisson", id: "hawai-25", name: "Hawai", price: 25 },
    { cat: "Boisson", id: "hawai-ananas-25", name: "Hawai Ananas", price: 25 },
    { cat: "Boisson", id: "schweppes-tonic-25", name: "Schweppes Tonic", price: 25 },
    { cat: "Boisson", id: "schweppes-citron-25", name: "Schweppes Citron", price: 25 },
    { cat: "Boisson", id: "poms-25", name: "Poms", price: 25 },
    { cat: "Boisson", id: "oulmes-15", name: "Oulmes 33 cl", price: 15 },
    { cat: "Boisson", id: "oulmes-orange-40", name: "Oulmes Orange", price: 40 },
    { cat: "Boisson", id: "eau-grande-20", name: "Eau minérale Grande", price: 20 },
    { cat: "Boisson", id: "eau-petite-15", name: "Eau minérale petite", price: 15 },
    { cat: "Boisson", id: "perrier-pm-30", name: "Perrier petite", price: 30 },
    { cat: "Boisson", id: "perrier-40", name: "Perrier Moyenne", price: 40 },
    { cat: "Boisson", id: "bavaria-40", name: "Bière 0% Bavaria", price: 40 },
    { cat: "Boisson", id: "san-miguel-30", name: "San Miguel", price: 30 },
    { cat: "Boisson", id: "the-marocain-25", name: "Thé marocain", price: 25 },
    { cat: "Boisson", id: "cafe-nespresso-30", name: "Café Nespresso", price: 30 },
    { cat: "Boisson", id: "cappuccino-55", name: "Cappuccino", price: 55 },
    { cat: "Boisson", id: "jus-orange-40", name: "Jus d'orange", price: 40 },
    { cat: "Boisson", id: "jus-fruits-frais-35", name: "Jus de fruits frais", price: 35 },
    { cat: "Boisson", id: "jus-fruits-secs-40", name: "Jus de fruits sec", price: 40 },
    { cat: "Boisson", id: "cocktail-maison-50", name: "Cocktail maison", price: 50 },
    { cat: "Boisson", id: "boisson-aromatisee-40", name: "Boisson aromatisée", price: 40 },
    { cat: "Boisson", id: "boisson-energetique-50", name: "Boisson énergétique", price: 50 },
    { cat: "Boisson", id: "linx-35", name: "Linx", price: 35 },
  ],
  services: [
    { id: "xfer-300", name: "Transfert aéroport", price: 300, cat: "Conciergerie" },
    { id: "parking-30", name: "Parking privé", price: 30, cat: "Conciergerie" },
    { id: "pressing-10", name: "Pressing", price: 10, cat: "Conciergerie" },

    { id: "hammam-300", name: "Hammam homme", price: 300, cat: "SPA" },
    { id: "hammam-royal-480", name: "Hammam Royal", price: 480, cat: "SPA" },
    { id: "hammam-prive-150", name: "Hammam Privé Individuel", price: 150, cat: "SPA" },
    { id: "rituel-hammam-270", name: "Rituel Hammam", price: 270, cat: "SPA" },
    { id: "massage-300", name: "Massage", price: 300, cat: "SPA" },
    { id: "massage-relax-400", name: "Massage Relaxant", price: 400, cat: "SPA" },
    { id: "massage-tonic-470", name: "Massage Tonic", price: 470, cat: "SPA" },
    { id: "duo-hamm-mass-650", name: "Duo Hammam & Massage", price: 650, cat: "SPA" },
    { id: "duo-royal-vip-880", name: "Duo Royal VIP", price: 880, cat: "SPA" },
    { id: "kids-massage-250", name: "Massage Kids", price: 250, cat: "SPA" },
    { id: "kids-rituel-200", name: "Rituel Hammam Kids", price: 200, cat: "SPA" },
    { id: "kids-duo-380", name: "Forfait Duo Kids", price: 380, cat: "SPA" },
    { id: "manicure-120", name: "Manicure et pause vernis", price: 120, cat: "SPA" },
    { id: "brushing-court-60", name: "Brushing cheveux courts", price: 60, cat: "SPA" },
    { id: "brushing-long-80", name: "Brushing cheveux longs", price: 80, cat: "SPA" },
    { id: "brushing-enfant-50", name: "Brushing enfant", price: 50, cat: "SPA" },

    { id: "day-use-450", name: "Day Use en suite", price: 450, cat: "Hébergement" },
    { id: "salle-reunion-400", name: "Salle réunion", price: 400, cat: "Hébergement" },
  ],
  directory: {
    wifi: { ssid: "SuiteLoc-Guest", password: "SuiteLoc@2025" },
    rules: [
      "Check‑in 14h • Check‑out 12h",
      "Cuisine: jusqu’à 20h • Recouches: jusqu’à 21h",
      "Quiet hours: 23h",
      "Non‑fumeur",
    ],
    tv: ["TF1", "France 2", "M6", "2M", "BBC World", "CNN"],
  },
};

export default function App(){
  const [tab, setTab] = useState("home");
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");
  const add = (it)=> setCart(c=> [...c, { ...it, qty: it.qty || 1 }]);
  const removeIdx = (i)=> setCart(c=> c.filter((_,idx)=> idx!==i));
  const total = useMemo(()=> cart.reduce((s,it)=> s+(it.price||0)*(it.qty||1),0), [cart]);

  useEffect(()=>{ try{ localStorage.setItem("suiteloc_revamp", JSON.stringify({cart})); }catch{} },[cart]);

  const [testsOk, setTestsOk] = useState(null);
  useEffect(()=>{
    const results = [];
    const t = (name,fn)=>{ try{ fn(); results.push([name,true]); } catch(e){ results.push([name,false,String(e)]); } };
    t("setTab exists", ()=>{ if(typeof setTab!=="function") throw new Error("setTab"); });
    t("menu items valid", ()=>{ DB.menu.forEach(m=>{ if(!m.name||!m.cat||typeof m.price!=="number") throw new Error("bad item"); }); });
    setTestsOk(results.every(([,ok])=>ok));
    console.table(results.map(([name, ok, err])=>({name, ok, err})));
  },[cart]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf3ff] to-[#fff8f3] text-[#181a20]">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b" style={{borderColor: COLORS.border}}>
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border bg-white overflow-hidden p-1 shadow-sm" style={{borderColor: COLORS.border}}>
              <img alt="SuiteLoc" src="/logo.png" className="w-full h-full object-contain"/>
            </div>
            <div className="leading-tight">
              <div className="font-extrabold">Suite Loc & Spa</div>
              <div className="text-xs" style={{color: COLORS.inkSoft}}>Casablanca</div>
            </div>
          </div>
          <button onClick={()=>setTab("cart")} className="px-3 py-2 rounded-xl text-white" style={{background: COLORS.primary}}>🛒 Panier</button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-4">
        {tab==="home" && <Home setTab={setTab} />}
        {tab==="checkin" && <CheckIn />}
        {tab==="menu" && <Menu query={query} setQuery={setQuery} add={add} setTab={setTab} />}
        {tab==="services" && <Services add={add} />}
        {tab==="directory" && <Directory />}
        {tab==="cart" && <Cart cart={cart} total={total} removeIdx={removeIdx} />}
      </main>

      <footer className="max-w-md mx-auto px-4 pb-24 pt-2 text-xs" style={{color: COLORS.inkSoft}}>
        Tests: {testsOk==null?"…": testsOk?"✅ OK":"❌ Échec (voir console)"}
      </footer>

      <nav className="fixed bottom-3 inset-x-0 flex justify-center">
        <div className="bg-white/90 backdrop-blur border rounded-2xl shadow px-2 py-1 flex gap-1" style={{borderColor: COLORS.border}}>
          {[
            {id:"home", icon:"🏠", label:"Accueil"},
            {id:"checkin", icon:"📝", label:"Check‑in"},
            {id:"menu", icon:"🍽️", label:"Menu"},
            {id:"services", icon:"🧰", label:"Services"},
            {id:"cart", icon:"🛒", label:"Panier"},
          ].map(x=> (
            <button key={x.id} onClick={()=>setTab(x.id)} className={`px-3 py-2 rounded-xl text-sm ${tab===x.id?"text-white":""}`} style={{background: tab===x.id? COLORS.primary : "white", color: tab===x.id?"white":COLORS.ink}} title={x.label}>
              <span className="text-lg leading-none">{x.icon}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

function Home({ setTab }){
  return (
    <section className="space-y-4">
      <div className="rounded-3xl p-5 border bg-white" style={{borderColor: COLORS.border}}>
        <h1 className="text-2xl font-extrabold tracking-tight">Bienvenue 👋</h1>
        <p className="text-sm mt-1" style={{color: COLORS.inkSoft}}>Votre concierge numérique pour upgrades, check‑in, menu & services.</p>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {[{t:"Online check‑in", id:"checkin", ic:"📝"}, {t:"Concierge", id:"directory", ic:"📖"}, {t:"Room Service", id:"menu", ic:"🍽️"}, {t:"Services", id:"services", ic:"🧰"}].map(x=> (
            <button key={x.t} onClick={()=>setTab(x.id)} className="h-28 rounded-2xl border bg-white text-left p-3 hover:shadow transition" style={{borderColor: COLORS.border}}>
              <div className="text-2xl">{x.ic}</div>
              <div className="font-semibold mt-1">{x.t}</div>
              <div className="text-xs" style={{color: COLORS.inkSoft}}>Ouvrir</div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl p-5 border bg-white" style={{borderColor: COLORS.border}}>
        <div className="text-sm font-semibold mb-2">Pré‑arrivée</div>
        <div className="grid gap-2">
          {DB.offers.map(o=> (
            <div key={o.id} className="border rounded-2xl p-3 bg-white flex items-center justify-between" style={{borderColor: COLORS.border}}>
              <div>
                <div className="font-semibold">{o.name}</div>
                <div className="text-xs" style={{color: COLORS.inkSoft}}>{MAD(o.price)}</div>
              </div>
              <button className="px-3 py-2 rounded-xl text-white" style={{background: COLORS.primary}} onClick={()=>setTab("cart")}>Choisir</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckIn(){
  const F = [
    { key:'givenName', label:"Prénoms" },
    { key:'surname', label:"Nom" },
    { key:'birthDate', label:"Date de naissance", type:'date' },
    { key:'birthPlace', label:"Lieu de naissance" },
    { key:'nationality', label:"Nationalité" },
    { key:'profession', label:"Profession" },
    { key:'cinNumber', label:"Numéro CIN" },
    { key:'residenceCardNumber', label:"N° Carte de Séjour" },
    { key:'entryNumber', label:"N° d’Entrée au Maroc" },
    { key:'arrivalDate', label:"Date d’Arrivée", type:'date' },
    { key:'departureDate', label:"Date de sortie", type:'date' },
    { key:'roomNumber', label:"N° de Chambre" },
    { key:'minorsCount', label:"Nombre de mineurs accompagnant le client", type:'number' },
    { key:'comingFrom', label:"Provenance" },
    { key:'destination', label:"Destination" },
    { key:'passportNumber', label:"N° Passeport" },
    { key:'passportIssueDate', label:"Date de délivrance", type:'date' },
    { key:'passportIssuePlace', label:"Lieu de délivrance" },
    { key:'passportExpiryDate', label:"Date d’expiration", type:'date' },
    { key:'address', label:"Adresse", type:'textarea' },
    { key:'email', label:"Email", type:'email' },
    { key:'phone', label:"Téléphone", type:'tel' },
  ];
  const [data, setData] = useState({});
  const [saved, setSaved] = useState(false);
  const onChange = (k,v)=> setData(p=> ({...p, [k]: v}));
  const onSubmit = ()=>{ setSaved(true); setTimeout(()=>setSaved(false), 2000); };
  return (
    <section className="space-y-4">
      <div className="rounded-3xl p-5 border bg-white" style={{borderColor: COLORS.border}}>
        <div className="font-bold mb-2">Check‑in en ligne — Bulletin Individuel d’Hôtel</div>
        <div className="grid sm:grid-cols-2 gap-2 text-sm">
          {F.map(f=> (
            <label key={f.key} className={`space-y-1 ${f.type==='textarea'?'sm:col-span-2':''}`}>
              <div className="text-xs" style={{color: COLORS.inkSoft}}>{f.label}</div>
              {f.type==='textarea' ? (
                <textarea rows={3} value={data[f.key]||''} onChange={e=>onChange(f.key, e.target.value)} className="w-full border rounded-xl px-3 py-2 bg-white" style={{borderColor: COLORS.border}}/>
              ) : (
                <input type={f.type||'text'} value={data[f.key]||''} onChange={e=>onChange(f.key, f.type==='number'? (e.target.value===''? '' : Number(e.target.value)) : e.target.value)} className="w-full border rounded-xl px-3 py-2 bg-white" style={{borderColor: COLORS.border}}/>
              )}
            </label>
          ))}
        </div>
        <button onClick={onSubmit} className="mt-3 px-4 py-2 rounded-xl text-white" style={{background: COLORS.primary}}>Enregistrer</button>
        {saved && <span className="ml-2 text-xs" style={{color:'#0a8f6e'}}>✔ Enregistré localement</span>}
      </div>
    </section>
  );
}

function Menu({ query, setQuery, add, setTab }){
  const groups = useMemo(()=>{
    const m = new Map();
    DB.menu.forEach(it=>{ if(!m.has(it.cat)) m.set(it.cat, []); m.get(it.cat).push(it); });
    return Array.from(m.entries());
  },[]);
  const [qty, setQty] = useState({});
  const inc = (it)=> setQty(q=> ({...q, [it.id]: (q[it.id]||0)+1 }));
  const dec = (it)=> setQty(q=> ({...q, [it.id]: Math.max(0,(q[it.id]||0)-1) }));
  const count = useMemo(()=> Object.values(qty).reduce((a,b)=>a+(b||0),0), [qty]);
  const commit = ()=>{
    const items = DB.menu.filter(x=> (qty[x.id]||0)>0);
    if(!items.length) return;
    items.forEach(x=> add({ id:x.id, name:x.name, price:x.price, qty: qty[x.id] }));
    setQty({});
    if (typeof window!=='undefined' && window.scrollTo) window.scrollTo({top:0, behavior:'smooth'});
    setTab('cart');
  };
  const list = useMemo(()=> !query? DB.menu : DB.menu.filter(m=> m.name.toLowerCase().includes(query.toLowerCase()) || m.cat.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <section className="space-y-4">
      <div className="rounded-3xl p-5 border bg-white" style={{borderColor: COLORS.border}}>
        <label className="text-xs" style={{color: COLORS.inkSoft}}>Rechercher un plat / catégorie</label>
        <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="ex: tapas, eau, petit déjeuner…" className="mt-1 w-full border rounded-xl px-3 py-2 bg-white" style={{borderColor: COLORS.border}}/>
      </div>

      {groups.map(([cat, items])=> (
        <div key={cat} className="rounded-3xl p-4 border bg-white" style={{borderColor: COLORS.border}}>
          <div className="text-base font-bold mb-3">{cat}</div>
          <div className="divide-y" style={{divideColor: COLORS.border}}>
            {items.filter(i=> list.includes(i)).map(it=> (
              <div key={it.id} className="py-3 flex items-center justify-between">
                <div className="pr-3">
                  <div className="font-medium">{it.name}</div>
                  <div className="text-xs" style={{color: COLORS.inkSoft}}>{MAD(it.price)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>dec(it)} className="w-9 h-9 rounded-xl border bg-white text-lg leading-none" style={{borderColor: COLORS.border}}>−</button>
                  <div className="w-8 text-center font-semibold">{qty[it.id]||0}</div>
                  <button onClick={()=>inc(it)} className="w-9 h-9 rounded-xl text-white text-lg leading-none" style={{background: COLORS.primary}}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="fixed bottom-20 left-0 right-0 flex justify-center">
        <div className="bg-white/95 backdrop-blur border rounded-2xl shadow px-4 py-2 flex items-center gap-3" style={{borderColor: COLORS.border}}>
          <div className="text-sm">{count} article(s)</div>
          <button onClick={commit} className="px-4 py-2 rounded-xl text-white" style={{background: COLORS.primary}}>Ajouter au panier</button>
        </div>
      </div>
    </section>
  );
}

function Services({ add }){
  const groups = useMemo(()=>{
    const m = new Map();
    DB.services.forEach(it=>{ if(!m.has(it.cat)) m.set(it.cat, []); m.get(it.cat).push(it); });
    return Array.from(m.entries());
  },[]);
  return (
    <section className="space-y-4">
      {groups.map(([cat, items])=> (
        <div key={cat} className="rounded-3xl p-5 border bg-white" style={{borderColor: COLORS.border}}>
          <div className="text-base font-bold mb-3">{cat}</div>
          <div className="grid gap-2">
            {items.map(s=> (
              <div key={s.id} className="border rounded-2xl p-3 bg-white flex items-center justify-between" style={{borderColor: COLORS.border}}>
                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs" style={{color: COLORS.inkSoft}}>{MAD(s.price)}</div>
                </div>
                <button onClick={()=>add({ id:s.id, name:s.name, price:s.price, qty:1 })} className="px-3 py-2 rounded-xl text-white" style={{background: COLORS.primary}}>Ajouter</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function Directory(){
  return (
    <section className="rounded-3xl p-5 border bg-white space-y-2" style={{borderColor: COLORS.border}}>
      <div className="font-bold">Répertoire (Room Directory)</div>
      <div className="text-sm" style={{color: COLORS.inkSoft}}>Wi‑Fi — SSID: <b>{DB.directory.wifi.ssid}</b> • Mot de passe: <b>{DB.directory.wifi.password}</b></div>
      <div className="text-sm" style={{color: COLORS.inkSoft}}>Chaînes TV: {DB.directory.tv.join(" • ")}</div>
      <div className="text-sm mt-2">
        <div className="font-semibold">Règles maison</div>
        <ul className="list-disc pl-5">
          {DB.directory.rules.map(r=> <li key={r}>{r}</li>)}
        </ul>
      </div>
    </section>
  );
}

function Cart({ cart, total, removeIdx }){
  return (
    <section className="space-y-4">
      <div className="rounded-3xl p-5 border bg-white" style={{borderColor: COLORS.border}}>
        <div className="font-bold mb-2">Votre panier</div>
        {cart.length===0 ? (
          <div className="text-sm" style={{color: COLORS.inkSoft}}>Panier vide.</div>
        ) : (
          <div className="divide-y" style={{divideColor: COLORS.border}}>
            {cart.map((it,idx)=> (
              <div key={idx} className="py-2 flex items-center justify-between text-sm">
                <div>
                  <div className="font-semibold">{it.name}</div>
                  <div style={{color: COLORS.inkSoft}}>{it.qty} × {MAD(it.price)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-bold">{MAD((it.qty||1)*(it.price||0))}</div>
                  <button onClick={()=>removeIdx(idx)} className="px-3 py-2 rounded-xl border bg-white" style={{borderColor: COLORS.border}}>Retirer</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="rounded-3xl p-5 border bg-white flex items-center justify-between" style={{borderColor: COLORS.border}}>
        <div className="font-semibold">Total estimatif</div>
        <div className="text-lg font-extrabold">{MAD(total)}</div>
      </div>
      <button className="px-4 py-2 rounded-xl text-white" style={{background: COLORS.primary}}>Envoyer la demande</button>
    </section>
  );
}
