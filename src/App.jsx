import React, { useState, useRef, useMemo } from "react";

// Fonts locales via public/index.html
const FONTS = ``;

const Barcode = ({ color, opacity = 0.4 }) => (
  <div style={{ display: "flex", gap: "1.5px", height: 20, opacity }}>
    {[2, 4, 1, 3, 1, 4, 2, 3, 1, 2, 4, 1].map((w, i) => (
      <div key={i} style={{ width: w, height: "100%", background: color, borderRadius: 0.5 }} />
    ))}
  </div>
);

const Icon = ({ type, size=24, opacity=1, color }) => {
  const s = color || `rgba(255,255,255,${opacity})`;
  const p = { width:size, height:size, stroke:s, strokeWidth:1.8, fill:"none", strokeLinecap:"round", strokeLinejoin:"round" };
  switch(type) {
    case "search":  return <svg {...p} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
    case "archive": return <svg {...p} viewBox="0 0 24 24"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>;
    case "close":   return <svg {...p} viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
    case "folder":  return <svg {...p} viewBox="0 0 24 24"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>;
    case "stats":   return <svg {...p} viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
    case "plus":    return <svg {...p} viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
    case "ai":      return <svg {...p} viewBox="0 0 24 24"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1H1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/><circle cx="7.5" cy="14.5" r="1.5" fill={s} stroke="none"/><circle cx="16.5" cy="14.5" r="1.5" fill={s} stroke="none"/></svg>;
    case "trash":   return <svg {...p} viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>;
    case "home":    return <svg {...p} viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    case "receipt": return <svg {...p} viewBox="0 0 24 24"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>;
    case "inbox":   return <svg {...p} viewBox="0 0 24 24"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>;
    default: return null;
  }
};

const now = new Date();
const daysAgo = (d) => { const dt=new Date(); dt.setDate(dt.getDate()-d); return formatDate(dt); };
const fmt = (n) => n.toLocaleString("fr-FR",{minimumFractionDigits:2,maximumFractionDigits:2})+" €";
const MONTHS_FR = ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."];
const MONTHS_ALT = ["janv.","fev.","mars","avr.","mai","juin","juil.","aout","sept.","oct.","nov.","dec."];
const MONTH_IDX = Object.fromEntries([...MONTHS_FR,...MONTHS_ALT].map((m,i)=>[m,i%12]));
// parseDate: gère "3 mars 2026" (toLocaleDateString fr-FR) et "2026-03-03" (ISO input[date])
const parseDate = (str) => {
  if(!str) return new Date();
  try {
    if(/^\d{4}-\d{2}-\d{2}$/.test(str.trim())) return new Date(str+"T00:00:00");
    const pts = str.trim().split(/\s+/);
    if(pts.length>=3){ const day=parseInt(pts[0]); const yr=parseInt(pts[pts.length-1]); const mon=MONTH_IDX[pts[1].toLowerCase()]??0; return new Date(yr,mon,day); }
  } catch(e){}
  return new Date();
};
// formatDate: Date -> string affichable fr-FR
const formatDate = (d) => d.toLocaleDateString("fr-FR",{day:"numeric",month:"short",year:"numeric"});
// isoToDisplay: "2026-03-03" -> "3 mars 2026"
const isoToDisplay = (iso) => iso ? formatDate(new Date(iso+"T00:00:00")) : "";
const PERIODS = [{label:"7 j",days:7},{label:"1 mois",days:30},{label:"3 mois",days:90},{label:"1 an",days:365},{label:"Tout",days:36500}];

const CARD_PALETTES = {
  mono: [
    { grad:"linear-gradient(145deg,#1C1C1E,#2C2C2E)", accent:"#C9A84C", light:false },
    { grad:"linear-gradient(145deg,#F2EDE4,#E2D9CC)", accent:"#8B6040", light:true  },
    { grad:"linear-gradient(145deg,#111111,#1E1E1E)", accent:"#E8E2D6", light:false },
    { grad:"linear-gradient(145deg,#272218,#332C1E)", accent:"#D4AF37", light:false },
  ],
  vivid: [
    { grad:"linear-gradient(145deg,#E8445A,#c0392b)", accent:"#ff8a96", light:false },
    { grad:"linear-gradient(145deg,#3B82F6,#1d4ed8)", accent:"#93c5fd", light:false },
    { grad:"linear-gradient(145deg,#F59E0B,#b45309)", accent:"#fef08a", light:false },
    { grad:"linear-gradient(145deg,#8B5CF6,#5b21b6)", accent:"#c4b5fd", light:false },
  ],
  aurora: [
    { grad:"linear-gradient(145deg,#0f2027,#2c5364)", accent:"#4dd9ac", light:false },
    { grad:"linear-gradient(145deg,#1a1a2e,#0f3460)", accent:"#e94560", light:false },
    { grad:"linear-gradient(145deg,#134e5e,#71b280)", accent:"#a7f3d0", light:false },
    { grad:"linear-gradient(145deg,#0f0c29,#302b63)", accent:"#818cf8", light:false },
  ],
  sakura: [
    { grad:"linear-gradient(145deg,#fce4ec,#f8bbd0)", accent:"#c2185b", light:true  },
    { grad:"linear-gradient(145deg,#f3e5f5,#e1bee7)", accent:"#7b1fa2", light:true  },
    { grad:"linear-gradient(145deg,#fff3e0,#ffe0b2)", accent:"#e65100", light:true  },
    { grad:"linear-gradient(145deg,#e3f2fd,#bbdefb)", accent:"#1565c0", light:true  },
  ],
  neon: [
    { grad:"linear-gradient(145deg,#060612,#0d0d20)", accent:"#00ff88", light:false },
    { grad:"linear-gradient(145deg,#000d1a,#001a33)", accent:"#00d4ff", light:false },
    { grad:"linear-gradient(145deg,#0d0d0d,#1a0a2e)", accent:"#bf00ff", light:false },
    { grad:"linear-gradient(145deg,#1a0000,#2d0000)", accent:"#ff2d55", light:false },
  ],
  sunset: [
    { grad:"linear-gradient(145deg,#7b2d00,#b34700)", accent:"#ffb347", light:false },
    { grad:"linear-gradient(145deg,#4a0e0e,#7a1c1c)", accent:"#ff6b6b", light:false },
    { grad:"linear-gradient(145deg,#2d1b00,#5c3800)", accent:"#ffd166", light:false },
    { grad:"linear-gradient(145deg,#0a2e2e,#0d4f4f)", accent:"#06d6a0", light:false },
  ],
  classic: [
    { grad:"linear-gradient(160deg,#FDFCFA,#F0EDE6)", accent:"#1a1a1a", light:true  },
    { grad:"linear-gradient(160deg,#FDFCFA,#F0EDE6)", accent:"#1a1a1a", light:true  },
    { grad:"linear-gradient(160deg,#FDFCFA,#F0EDE6)", accent:"#1a1a1a", light:true  },
    { grad:"linear-gradient(160deg,#FDFCFA,#F0EDE6)", accent:"#1a1a1a", light:true  },
  ],
};
const getCardTheme = (uiTheme, idx) => (CARD_PALETTES[uiTheme]||CARD_PALETTES.mono)[idx % 4];

const THEMES = {
  mono:    {id:"mono",    label:"Mono Or", desc:"Noir or",  accent:"#C9A84C", bg:"#0a0a0a", card:"#141414"},
  vivid:   {id:"vivid",   label:"Vivid",   desc:"Couleurs", accent:"#6366f1", bg:"#0a0a0f", card:"#12121a"},
  aurora:  {id:"aurora",  label:"Aurora",  desc:"Nordique", accent:"#4dd9ac", bg:"#06100f", card:"#0d1a18"},
  sakura:  {id:"sakura",  label:"Sakura",  desc:"Pastel",   accent:"#f472b6", bg:"#0f0a0e", card:"#1a1018"},
  neon:    {id:"neon",    label:"Neon",    desc:"Cyber",    accent:"#00ff88", bg:"#060612", card:"#0d0d20"},
  sunset:  {id:"sunset",  label:"Sunset",  desc:"Chaleur",  accent:"#ffb347", bg:"#100800", card:"#1a1000"},
  classic: {id:"classic", label:"Classic", desc:"Ticket",   accent:"#e0e0e0", bg:"#0a0a0a", card:"#141414"},
};

const YF = {main:"#F2D06B", dark:"#D4AF37", text:"#1A0A00"};
const BODY_H = 58, SHOW_PX = 34;

const INIT_FOLDERS = [
  {id:"a1", label:"Depenses du mois", sub:"Tickets du quotidien",  color:"#C9A84C"},
  {id:"a2", label:"Voyages",          sub:"Billets et transports", color:"#6ee7b7"},
  {id:"a3", label:"Sante",            sub:"Medecin et pharmacie",  color:"#f9a8d4"},
];

const INIT_TICKETS = [
  {id:1,  label:"Carrefour",   amount:47.80,  date:daysAgo(3),  items:["Yaourts x6","Pain complet","Beurre"], cardTheme:0, archived:false},
  {id:2,  label:"Free Mobile", amount:19.99,  date:daysAgo(15), items:["Abonnement mobile mars"],              cardTheme:1, archived:false},
  {id:3,  label:"SNCF",        amount:124.00, date:daysAgo(8),  items:["Paris Lyon TGV 2nde cl."],             cardTheme:2, archived:false},
  {id:4,  label:"Amazon",      amount:89.99,  date:daysAgo(5),  items:["Casque Sony WH-1000XM5","Cable USB-C"],cardTheme:3, archived:false},
  {id:5,  label:"Pharmacie",   amount:34.60,  date:daysAgo(12), items:["Doliprane 500mg x30","Vitamine D"],    cardTheme:4, archived:false},
  {id:6,  label:"Le Procope",  amount:68.00,  date:daysAgo(7),  items:["Menu duo","Vin rouge Bordeaux"],       cardTheme:5, archived:false},
  {id:7,  label:"Leclerc",     amount:112.30, date:daysAgo(8),  items:["Viande","Legumes","Fromage","Fruits"], cardTheme:6, archived:true, archiveFolder:"a1"},
  {id:8,  label:"EDF",         amount:156.40, date:daysAgo(10), items:["Electricite janv. 2026"],              cardTheme:7, archived:true, archiveFolder:"a1"},
];

// ─── TICKET CARD ─────────────────────────────────────────────────
const PEEK = 96, CARD_H = 210;

const TicketCard = ({ticket, index, total, onClick, uiTheme}) => {
  const ct = getCardTheme(uiTheme, ticket.cardTheme||0);
  const textColor  = ct.light ? "rgba(20,10,0,0.9)"  : "rgba(255,255,255,0.95)";
  const subColor   = ct.light ? "rgba(20,10,0,0.45)" : "rgba(255,255,255,0.35)";
  const accentColor = ct.accent;
  const bottomOffset = (total - 1 - index) * PEEK;

  return (
    <div className="wcard-wrapper" onClick={onClick} style={{
      position:"absolute", bottom:bottomOffset, left:0, right:0, height:CARD_H,
      cursor:"pointer",
      transition:"transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      zIndex:index,
      filter:ct.light
        ?(index===total-1?"drop-shadow(0 -2px 1px rgba(0,0,0,0.14))":"drop-shadow(0 -2px 1px rgba(0,0,0,0.11))")
        :(index===total-1?"drop-shadow(0 -2px 1px rgba(0,0,0,0.35)) drop-shadow(0 20px 30px rgba(0,0,0,0.6))":"drop-shadow(0 -2px 1px rgba(0,0,0,0.28)) drop-shadow(0 8px 16px rgba(0,0,0,0.4))"),

    }}>
      {ticket.unread&&<div style={{position:"absolute",top:12,right:12,zIndex:20,width:11,height:11,borderRadius:"50%",background:"#ff3b30",boxShadow:"0 0 8px rgba(255,59,48,0.9)",animation:"pulse 1.5s infinite",pointerEvents:"none"}}/>}
    <div className="receipt-shape-both" style={{
      width:"100%", height:"100%",
      background:ct.grad,
      border:`1px solid ${ct.light?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.1)"}`,
      padding:"18px 20px 16px",
      display:"flex", flexDirection:"column",
    }}>
      {/* Header : icone + nom + montant/date */}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
        <div style={{width:40,height:40,borderRadius:12,background:`${accentColor}20`,border:`1px solid ${accentColor}30`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <Icon type="receipt" size={20} opacity={0.8} color={accentColor}/>
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{color:textColor,fontSize:19,fontWeight:700,fontFamily:"'Courier Prime',monospace",letterSpacing:0,lineHeight:1.1}}>
            {ticket.label}
          </div>
          <div style={{color:subColor,fontSize:10,fontFamily:"'Courier Prime',monospace",marginTop:2}}>{ticket.date}</div>
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          <div style={{color:accentColor,fontSize:20,fontWeight:700,fontFamily:"'Space Mono',monospace",letterSpacing:-1,lineHeight:1}}>
            {fmt(ticket.amount)}
          </div>
          <div style={{color:subColor,fontSize:8,fontFamily:"'Space Mono',monospace",marginTop:2,textTransform:"uppercase",textAlign:"right"}}>Total</div>
        </div>
      </div>

      {/* Pointilles haut */}
      <div style={{borderTop:`1px dashed ${subColor}`,marginBottom:8,opacity:0.4}}/>

      {/* Articles */}
      <div style={{flex:1,display:"flex",flexDirection:"column",gap:4}}>
        {ticket.items?.slice(0,3).map((item,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",color:subColor,fontSize:11,fontFamily:"'Courier Prime',monospace"}}>
            <span>{item}</span><span>···</span>
          </div>
        ))}
        {ticket.items?.length>3&&(
          <div style={{color:subColor,fontSize:10,fontStyle:"italic",fontFamily:"'Courier Prime',monospace"}}>
            + {ticket.items.length-3} autres
          </div>
        )}
      </div>

      {/* Pointilles bas + code-barres */}
      <div style={{borderTop:`1px dashed ${subColor}`,marginTop:4,paddingTop:6,opacity:0.4}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Barcode color={textColor} opacity={0.35}/>
        <div style={{color:subColor,fontSize:7,fontFamily:"'Space Mono',monospace",letterSpacing:0.5}}>
          TXN-{String(ticket.id).padStart(9,"0")}
        </div>
      </div>
    </div>
    </div>
  );
};

// ─── ARCHIVE FOLDER ───────────────────────────────────────────────
const ArchiveFolder = ({folder, tickets, index, isOpen, onToggle, onEdit, onDelete, uiTheme}) => (
  <div style={{position:"relative",zIndex:isOpen?100:10+index,marginBottom:isOpen?12:-(BODY_H-SHOW_PX),transition:"margin-bottom 0.4s cubic-bezier(0.4,0,0.2,1),transform 0.3s ease",transform:isOpen?"scale(1.012)":"scale(1)"}}>
    <div style={{width:80,height:20,background:`linear-gradient(to top,${YF.main},#FBF2A8)`,borderRadius:"8px 8px 0 0",marginLeft:"auto",marginRight:20+index*8,border:"1px solid rgba(139,96,32,0.18)",borderBottom:"none"}}/>
    <div className="acard" onClick={onToggle} style={{background:"linear-gradient(175deg,#F7E070 0%,#EEBF35 65%,#D9A820 100%)",borderRadius:14,cursor:"pointer",boxShadow:isOpen?"0 16px 36px rgba(0,0,0,0.4)":"0 4px 12px rgba(0,0,0,0.25)",border:"1px solid rgba(139,96,32,0.22)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:20,background:"linear-gradient(180deg,rgba(255,255,255,0.22) 0%,transparent 100%)",borderRadius:"14px 14px 0 0",pointerEvents:"none"}}/>
      <div style={{height:BODY_H,display:"flex",alignItems:"center",padding:"0 14px",gap:10}}>
        <div style={{width:32,height:32,borderRadius:9,background:"rgba(100,60,0,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <Icon type="folder" size={16} color={YF.text}/>
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{color:YF.text,fontSize:13,fontWeight:700,fontFamily:"Outfit,sans-serif",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{folder.label}</div>
          <div style={{color:"rgba(80,40,0,0.55)",fontSize:9.5,fontFamily:"Outfit,sans-serif",marginTop:2}}>{tickets.length} ticket{tickets.length!==1?"s":""}</div>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <button onClick={e=>{e.stopPropagation();onEdit();}} style={{border:"none",background:"rgba(100,60,0,0.12)",borderRadius:7,padding:"5px 8px",color:"rgba(80,40,0,0.7)",fontSize:10,cursor:"pointer",fontFamily:"Outfit,sans-serif"}}>Modifier</button>
          <svg style={{transition:"transform 0.3s",transform:isOpen?"rotate(90deg)":"rotate(0deg)",opacity:0.5}} width="10" height="16" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke={YF.text} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </div>
    <div style={{maxHeight:isOpen?500:0,overflow:"hidden",transition:"max-height 0.45s cubic-bezier(0.4,0,0.2,1),opacity 0.3s",opacity:isOpen?1:0}}>
      <div style={{background:"#1a1a1a",borderRadius:"0 0 14px 14px",border:"1px solid rgba(255,255,255,0.07)",borderTop:"none",padding:"6px 0 6px"}}>
        {tickets.length===0&&<div style={{textAlign:"center",color:"rgba(255,255,255,0.2)",padding:"16px 0",fontSize:12,fontFamily:"Outfit,sans-serif"}}>Aucun ticket archive</div>}
        {tickets.map((t,i)=>{
          const ct=getCardTheme(uiTheme, t.cardTheme||0);
          return (
            <div key={t.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",animation:`rowSlide 0.3s cubic-bezier(0.22,1,0.36,1) ${i*0.05}s both`,borderBottom:i<tickets.length-1?"1px solid rgba(255,255,255,0.04)":"none"}}>
              <div style={{width:28,height:28,borderRadius:8,background:ct.grad,flexShrink:0,boxShadow:"0 2px 6px rgba(0,0,0,0.3)"}}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{color:"white",fontSize:13,fontWeight:500,fontFamily:"Outfit,sans-serif"}}>{t.label}</div>
                <div style={{color:"rgba(255,255,255,0.3)",fontSize:10,fontFamily:"Outfit,sans-serif",marginTop:1}}>{t.date}</div>
              </div>
              <div style={{color:"white",fontSize:13,fontFamily:"Outfit,sans-serif",flexShrink:0}}>{fmt(t.amount)}</div>
            </div>
          );
        })}
        <div style={{borderTop:"1px solid rgba(255,255,255,0.05)",marginTop:4,padding:"8px 14px 0"}}>
          <button onClick={e=>{e.stopPropagation();onDelete();}} style={{border:"none",background:"rgba(220,38,38,0.1)",borderRadius:8,padding:"7px 12px",color:"#b91c1c",fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"Outfit,sans-serif"}}>Supprimer ce dossier</button>
        </div>
      </div>
    </div>
  </div>
);

// ─── BAR CHART ────────────────────────────────────────────────────
const BarChart = ({data, color}) => {
  const max = Math.max(...data.map(d=>d.v),1);
  return (
    <div style={{display:"flex",alignItems:"flex-end",gap:4,height:60}}>
      {data.map((d,i)=>(
        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
          <div style={{width:"100%",borderRadius:"4px 4px 0 0",background:i===data.length-1?color:"rgba(255,255,255,0.1)",height:Math.max(4,(d.v/max)*52),transition:"height 0.6s ease",minHeight:4}}/>
          <span style={{color:"rgba(255,255,255,0.3)",fontSize:8,fontFamily:"Outfit,sans-serif"}}>{d.l}</span>
        </div>
      ))}
    </div>
  );
};

// ─── HELPERS localStorage ─────────────────────────────────────────
function loadStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}
function usePersist(key, init) {
  const [val, setVal] = useState(() => loadStorage(key, init));
  const set = (updater) => {
    setVal(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  };
  return [val, set];
}

// ─── APP ──────────────────────────────────────────────────────────
export default function App() {
  const [tickets,    setTickets]    = usePersist("wallet_tickets", INIT_TICKETS);
  const [folders,    setFolders]    = usePersist("wallet_folders", INIT_FOLDERS);
  const [uiTheme,    setUiTheme]    = usePersist("wallet_theme",   "classic");
  const [view,       setView]       = useState("home");
  const [viewAnim,   setViewAnim]   = useState("in");
  const [activeTab,  setActiveTab]  = useState("home");

  const [addSheet,   setAddSheet]   = useState(false);
  const [addMode,    setAddMode]    = useState(null);
  const [detailT,    setDetailT]    = useState(null);
  const [archivePick,setArchivePick]= useState(null);
  const [folderModal,setFolderModal]= useState(false);
  const [editFolder, setEditFolder] = useState(null);
  const [folderForm, setFolderForm] = useState({label:"",sub:""});
  const [archiveOpen,setArchiveOpen]= useState(null);

  const [form,       setForm]       = useState({label:"",amount:"",date:"",items:""});
  const [searchQ,    setSearchQ]    = useState("");
  const [period,     setPeriod]     = useState(1);
  const [statPeriod, setStatPeriod] = useState(2);
  const [toast,      setToast]      = useState(null);
  const [aiPhase,    setAiPhase]    = useState(0);
  const [aiResult,   setAiResult]   = useState(null);
  const [scanPct,    setScanPct]    = useState(0);

  const fileRef   = useRef();
  const searchRef = useRef();
  const theme = THEMES[uiTheme];

  const changeView = (v, cb) => { setViewAnim("out"); setTimeout(()=>{ setView(v); setViewAnim("in"); if(cb) cb(); }, 150); };
  const goSearch = () => changeView("search", ()=>setTimeout(()=>searchRef.current&&searchRef.current.focus(),60));
  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null),2600); };

  const archivedTickets = useMemo(()=>tickets.filter(t=>t.archived),[tickets]);

  const statDays = PERIODS[statPeriod].days;
  const statCutoff = useMemo(()=>{ const d=new Date(); d.setDate(d.getDate()-statDays); return d; },[statDays]);
  const statData = useMemo(()=>{
    const n=new Date();
    const filtered = tickets.filter(t=>parseDate(t.date)>=statCutoff);
    const ttl=filtered.reduce((s,t)=>s+t.amount,0);
    const biggest=[...filtered].sort((a,b)=>b.amount-a.amount)[0];
    const bars = [];
    if(statDays<=31){
      // vue semaine/mois: barres par jour (7 jours) ou par semaine (30j)
      const nbBars = statDays<=7?7:6;
      const step = Math.floor(statDays/nbBars);
      for(let i=nbBars-1;i>=0;i--){
        const from=new Date(n); from.setDate(from.getDate()-i*step-step+1); from.setHours(0,0,0,0);
        const to=new Date(n); to.setDate(to.getDate()-i*step); to.setHours(23,59,59,999);
        const v=tickets.filter(t=>{const d=parseDate(t.date);return d>=from&&d<=to;}).reduce((s,t)=>s+t.amount,0);
        const lbl=statDays<=7?from.toLocaleDateString("fr-FR",{weekday:"short"}).slice(0,3):from.toLocaleDateString("fr-FR",{day:"numeric",month:"short"}).replace(" ",".");
        bars.push({l:lbl,v});
      }
    } else {
      // vue 3 mois / 1 an: barres par mois
      const nbMonths=statDays<=90?3:12;
      for(let i=nbMonths-1;i>=0;i--){
        const m=new Date(n.getFullYear(),n.getMonth()-i,1);
        const mEnd=new Date(n.getFullYear(),n.getMonth()-i+1,0); mEnd.setHours(23,59,59,999);
        const v=tickets.filter(t=>{const d=parseDate(t.date);return d>=m&&d<=mEnd;}).reduce((s,t)=>s+t.amount,0);
        bars.push({l:MONTHS_FR[m.getMonth()],v});
      }
    }
    return {bars,total:ttl,count:filtered.length,biggest};
  },[tickets,statCutoff,statDays]);

  const periodDays = PERIODS[period].days;
  const cutoff = useMemo(()=>{ const d=new Date(); d.setDate(d.getDate()-periodDays); return d; },[periodDays]);
  const activeTickets = useMemo(()=>tickets.filter(t=>!t.archived&&parseDate(t.date)>=cutoff).sort((a,b)=>parseDate(b.date)-parseDate(a.date)),[tickets,cutoff]);
  const total = activeTickets.length;
  const stackH = total > 0 ? CARD_H + PEEK * (total - 1) : 100;
  const periodStats = useMemo(()=>({count:activeTickets.length,total:activeTickets.reduce((s,t)=>s+t.amount,0)}),[activeTickets]);
  const searchResults = useMemo(()=>{ if(!searchQ.trim()) return []; const q=searchQ.toLowerCase(); return tickets.filter(t=>t.label.toLowerCase().includes(q)); },[searchQ,tickets]);

  const nextTheme = () => tickets.filter(t=>!t.archived).length % 4;

  const submitManual = () => {
    if(!form.label||!form.amount) return;
    const t={id:Date.now(),label:form.label.trim(),amount:parseFloat(form.amount.replace(",",".")||0),date:form.date?isoToDisplay(form.date):formatDate(new Date()),items:form.items?form.items.split(",").map(s=>s.trim()).filter(Boolean):[],cardTheme:nextTheme(),archived:false,unread:true};
    setTickets(prev=>[t,...prev]); setForm({label:"",amount:"",date:"",items:""}); setAddMode(null); setAddSheet(false); showToast("Ticket ajoute");
  };

  const deleteTicket   = (id) => { setTickets(prev=>prev.filter(t=>t.id!==id)); setDetailT(null); showToast("Ticket supprime"); };
  const archiveTicket  = (tid,fid) => { setTickets(prev=>prev.map(t=>t.id===tid?{...t,archived:true,archiveFolder:fid}:t)); setArchivePick(null); setDetailT(null); showToast("Ticket archive"); };
  const unarchiveTicket= (id) => { setTickets(prev=>prev.map(t=>t.id===id?{...t,archived:false,archiveFolder:undefined}:t)); setDetailT(null); showToast("Remis dans le wallet"); };

  const saveFolder = () => {
    if(!folderForm.label) return;
    if(editFolder){ setFolders(prev=>prev.map(f=>f.id===editFolder?{...f,...folderForm}:f)); showToast("Dossier modifie"); }
    else { const cols=["#C9A84C","#6ee7b7","#f9a8d4","#93c5fd","#c4b5fd"]; setFolders(prev=>[...prev,{id:"f"+Date.now(),label:folderForm.label,sub:folderForm.sub||"",color:cols[prev.length%cols.length]}]); showToast("Dossier cree"); }
    setFolderModal(false); setEditFolder(null); setFolderForm({label:"",sub:""});
  };
  const deleteFolder = (id) => { setFolders(prev=>prev.filter(f=>f.id!==id)); setTickets(prev=>prev.map(t=>t.archiveFolder===id?{...t,archived:false,archiveFolder:undefined}:t)); setArchiveOpen(null); showToast("Dossier supprime"); };

  // ─── MINDEE OCR via Netlify Function (proxy sécurisé) ────────────
  // La clé API est dans les variables d'environnement Netlify — jamais dans le code

  const triggerAiScan = () => { if(fileRef.current) fileRef.current.click(); };

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if(!file) return;
    e.target.value = "";
    setAddSheet(false); setAddMode(null); setAiPhase(1); setScanPct(0);

    let p = 0;
    const iv = setInterval(() => { p += 0.8; if(p < 90) setScanPct(Math.round(p)); }, 100);

    try {
      setTimeout(() => setAiPhase(2), 1000);

      // Charge Tesseract depuis CDN
      if(!window.Tesseract) {
        await new Promise((res, rej) => {
          const s = document.createElement("script");
          s.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
          s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
        });
      }

      // Compresse l'image
      const imgUrl = await new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
          URL.revokeObjectURL(url);
          const canvas = document.createElement("canvas");
          const MAX = 1600;
          let w = img.width, h = img.height;
          if(w > MAX || h > MAX) {
            if(w > h) { h = Math.round(h*MAX/w); w = MAX; }
            else { w = Math.round(w*MAX/h); h = MAX; }
          }
          canvas.width = w; canvas.height = h;
          canvas.getContext("2d").drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", 0.9));
        };
        img.onerror = () => reject(new Error("Lecture image impossible"));
        img.src = URL.createObjectURL(file);
      });

      // OCR avec Tesseract (français + anglais)
      const worker = await window.Tesseract.createWorker(["fra", "eng"], 1, {
        logger: m => { if(m.status === "recognizing text") setScanPct(Math.round(10 + m.progress * 80)); }
      });
      const { data: { text } } = await worker.recognize(imgUrl);
      await worker.terminate();

      clearInterval(iv);
      setScanPct(100);

      // ---- PARSING OCR AMELIORE ----
      const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 1);
      const linesLow = lines.map(l => l.toLowerCase());

      // MONTANT TOTAL : cherche ligne avec mot-cle total/ttc/net/payer
      const totalKw = ["total","ttc","net a payer","montant","a payer","net","sum","amount","avoir"];
      var totalAmt = 0;
      var totalLineIdx = -1;
      for(let i = 0; i < lines.length; i++) {
        const ll = linesLow[i];
        if(totalKw.some(k => ll.includes(k))) {
          const nums = lines[i].match(/\d+[.,]\d{2}/g);
          if(nums) {
            const val = parseFloat(nums[nums.length-1].replace(",","."));
            if(val > totalAmt) { totalAmt = val; totalLineIdx = i; }
          }
        }
      }
      if(totalAmt === 0) {
        const allA = [];
        lines.forEach(l => { const m = l.match(/\d+[.,]\d{2}/g); if(m) m.forEach(v => allA.push(parseFloat(v.replace(",","."))))});
        if(allA.length) totalAmt = Math.max(...allA);
      }

      // NOM DU COMMERCE : premieres lignes, evite les lignes parasites
      const skipW = ["ticket","caisse","bienvenue","merci","bonjour","www","tel","fax","tva","siret","siren","adresse","rue","avenue","boulevard","cedex","receipt","invoice"];
      var nameLine = lines.slice(0, 8).find(l => {
        const ll = l.toLowerCase();
        return l.length >= 3 &&
          !skipW.some(w => ll.includes(w)) &&
          !/^\d+$/.test(l) &&
          !/^[€$%*#@]/.test(l) &&
          !/^\d{2}[/.\-]/.test(l);
      }) || lines[0] || "Ticket";

      // DATE
      const dateMatch = text.match(/(\d{1,2})[/\.\-](\d{1,2})[/\.\-](\d{2,4})/);
      var displayDate = formatDate(new Date());
      if(dateMatch) {
        try {
          const [,d,m,y] = dateMatch;
          const year = y.length===2?"20"+y:y;
          const dt = new Date(parseInt(year), parseInt(m)-1, parseInt(d));
          if(!isNaN(dt) && dt.getFullYear()>=2000) displayDate = formatDate(dt);
        } catch {}
      }

      // ARTICLES : lignes avec prix avant le total
      const endIdx = totalLineIdx > 0 ? totalLineIdx : lines.length;
      var items = lines.slice(0, endIdx)
        .filter(l => /\d+[.,]\d{2}/.test(l) && l.length > 4)
        .slice(0, 6)
        .map(l => l.replace(/\s*\d+[.,]\d{2}\s*[€]?\s*$/, "").replace(/^\d+\s+/, "").trim())
        .filter(l => l.length > 2 && !/^[\d.,€]+$/.test(l));

      setAiResult({
        label:     nameLine.slice(0, 30),
        amount:    parseFloat(totalAmt.toFixed(2)),
        date:      displayDate,
        items:     items.length > 0 ? items : ["Ticket scanné"],
        cardTheme: nextTheme(),
        confidence: Math.min(95, 60 + amounts.length * 5),
      });

      setAiPhase(3);

    } catch(err) {
      clearInterval(iv);
      setAiPhase(0);
      setAiResult(null);
      showToast("Scan échoué : " + (err.message || "Erreur"));
    }
  };

  const confirmAi = () => {
    setTickets(prev => [{ id: Date.now(), ...aiResult, archived: false, unread: true }, ...prev]);
    setAiPhase(0);
    setAiResult(null);
    showToast("Ticket ajouté par IA ✓");
  };


  return (
    <div style={{width:"100%",height:"100dvh",background:theme.bg,display:"flex",flexDirection:"column",overflow:"hidden",position:"relative",WebkitOverflowScrolling:"touch"}}>
      <style>{CSS}</style>

        {/* VIEWS */}
        <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",animation:viewAnim==="in"?"viewIn 0.28s cubic-bezier(0.22,1,0.36,1) both":"viewOut 0.15s ease-in both",pointerEvents:viewAnim==="out"?"none":"auto"}}>

        {view==="home"&&<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"14px 22px 0",flexShrink:0}}>
            <div>
              <p style={{margin:0,color:`${theme.accent}99`,fontSize:10,fontWeight:500,letterSpacing:3,textTransform:"uppercase",fontFamily:"Outfit,sans-serif"}}>Mon Wallet</p>
              <h1 style={{margin:"4px 0 0",color:"white",fontSize:28,fontWeight:700,letterSpacing:-0.5,fontFamily:"Outfit,sans-serif"}}>{total} ticket{total!==1?"s":""}</h1>
            </div>
            <div style={{display:"flex",gap:7,marginTop:8}}>
              <button className="hbtn" onClick={goSearch} style={HBtn}><Icon type="search" size={17}/></button>
              <button className="hbtn" onClick={()=>setAddSheet(true)} style={{...HBtn,background:`linear-gradient(135deg,${theme.accent}bb,${theme.accent})`,boxShadow:`0 4px 14px ${theme.accent}44`}}>
                <Icon type="plus" size={17} color="#000"/>
              </button>
            </div>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"20px 18px 200px",position:"relative",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain"}}>
            {total===0
              ?<div style={{textAlign:"center",paddingTop:80,color:"rgba(255,255,255,0.15)"}}>
                  <Icon type="receipt" size={44} opacity={0.15}/>
                  <div style={{fontFamily:"Outfit,sans-serif",fontSize:13,marginTop:14,lineHeight:1.6}}>Aucun ticket<br/>Appuyez sur + pour en ajouter</div>
                </div>
              :<div style={{position:"relative",height:stackH,margin:"0 auto",maxWidth:354}}>
                  {activeTickets.map((ticket,i)=>(
                    <TicketCard key={ticket.id} ticket={ticket} index={i} total={total} onClick={()=>{setDetailT(ticket);setTickets(p=>p.map(x=>x.id===ticket.id?{...x,unread:false}:x));}} uiTheme={uiTheme}/>
                  ))}
                </div>
            }
          </div>
          <div style={{position:"absolute",bottom:56,left:0,right:0,zIndex:80,background:"rgba(10,10,10,0.95)",backdropFilter:"blur(24px)",borderTop:"1px solid rgba(255,255,255,0.07)",padding:"10px 18px 12px"}}>
            <div style={{display:"flex",gap:6,marginBottom:9}}>
              {PERIODS.map((p,i)=>{
                const pCutoff=new Date(); pCutoff.setDate(pCutoff.getDate()-p.days);
                const hasUnread=tickets.some(t=>!t.archived&&t.unread&&parseDate(t.date)>=pCutoff);
                return <button key={i} onClick={()=>setPeriod(i)} style={{flex:1,height:26,borderRadius:9,border:"none",cursor:"pointer",background:period===i?`${theme.accent}33`:"rgba(255,255,255,0.05)",color:period===i?theme.accent:"rgba(255,255,255,0.3)",fontSize:10,fontWeight:period===i?600:400,fontFamily:"Outfit,sans-serif",transition:"all 0.2s",position:"relative"}}>
                  {p.label}
                  {hasUnread&&<span style={{position:"absolute",top:3,right:4,width:6,height:6,borderRadius:"50%",background:"#ff3b30",boxShadow:"0 0 4px rgba(255,59,48,0.9)"}}/>}
                </button>;
              })}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:"rgba(255,255,255,0.2)",fontSize:10,fontFamily:"Outfit,sans-serif"}}>{period===4?"Tous les tickets":`Sur ${PERIODS[period].label}`}</span>
              <div style={{display:"flex",gap:16,alignItems:"center"}}>
                <div style={{textAlign:"center"}}><div style={{color:"white",fontSize:17,fontWeight:500,fontFamily:"Outfit,sans-serif",lineHeight:1}}>{fmt(periodStats.total)}</div><div style={{color:"rgba(255,255,255,0.25)",fontSize:9,letterSpacing:1.5,textTransform:"uppercase",fontFamily:"Outfit,sans-serif",marginTop:2}}>depense</div></div>
                <div style={{width:1,height:22,background:"rgba(255,255,255,0.08)"}}/>
                <div style={{textAlign:"center"}}><div style={{color:"white",fontSize:17,fontWeight:500,fontFamily:"Outfit,sans-serif",lineHeight:1}}>{periodStats.count}</div><div style={{color:"rgba(255,255,255,0.25)",fontSize:9,letterSpacing:1.5,textTransform:"uppercase",fontFamily:"Outfit,sans-serif",marginTop:2}}>tickets</div></div>
              </div>
            </div>
          </div>
        </>}

        {view==="search"&&<>
          <div style={{padding:"16px 18px 0",flexShrink:0}}>
            <div style={{display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,0.07)",borderRadius:16,padding:"0 14px",border:"1px solid rgba(255,255,255,0.1)"}}>
              <Icon type="search" size={16} opacity={0.4}/>
              <input ref={searchRef} value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Nom du ticket..." style={{flex:1,background:"none",border:"none",outline:"none",color:"white",fontSize:14,fontFamily:"Outfit,sans-serif",padding:"13px 0"}} autoFocus/>
              {searchQ&&<button onClick={()=>setSearchQ("")} style={{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",opacity:0.4}}><Icon type="close" size={16}/></button>}
            </div>
            <button onClick={()=>{changeView("home");setSearchQ("");}} style={{background:"none",border:"none",color:"rgba(255,255,255,0.4)",fontSize:12,fontFamily:"Outfit,sans-serif",cursor:"pointer",marginTop:8,padding:0}}>Retour</button>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"10px 16px 80px",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain"}}>
            {!searchQ&&<div style={{textAlign:"center",color:"rgba(255,255,255,0.18)",padding:"60px 0",fontSize:13,fontFamily:"Outfit,sans-serif"}}>Tapez pour chercher</div>}
            {searchQ&&searchResults.length===0&&<div style={{textAlign:"center",color:"rgba(255,255,255,0.18)",padding:"60px 0",fontSize:13,fontFamily:"Outfit,sans-serif"}}>Aucun resultat</div>}
            {searchResults.map((t,i)=>{
              const ct=getCardTheme(uiTheme,t.cardTheme||0);
              return <div key={t.id} className="rrow" onClick={()=>setDetailT(t)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 12px",borderRadius:16,marginBottom:4,cursor:"pointer",animation:`rowSlide 0.3s cubic-bezier(0.22,1,0.36,1) ${i*0.04}s both`}}>
                <div style={{width:38,height:38,borderRadius:12,background:ct.grad,flexShrink:0,boxShadow:"0 2px 8px rgba(0,0,0,0.35)"}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{color:"white",fontSize:14,fontWeight:500,fontFamily:"Outfit,sans-serif"}}>{t.label}</div>
                  <div style={{color:"rgba(255,255,255,0.3)",fontSize:10,fontFamily:"Outfit,sans-serif",marginTop:2}}>{t.date}{t.archived&&<span style={{color:"rgba(255,200,100,0.6)",marginLeft:8}}>Archive</span>}</div>
                </div>
                <span style={{color:"white",fontSize:14,fontFamily:"Outfit,sans-serif",flexShrink:0}}>{fmt(t.amount)}</span>
              </div>;
            })}
          </div>
        </>}

        {view==="archive"&&<>
          <div style={{padding:"14px 22px 10px",flexShrink:0}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <p style={{margin:0,color:`${theme.accent}99`,fontSize:10,fontWeight:500,letterSpacing:3,textTransform:"uppercase",fontFamily:"Outfit,sans-serif"}}>Stockage</p>
                <h1 style={{margin:"4px 0 0",color:"white",fontSize:26,fontWeight:800,fontFamily:"Outfit,sans-serif",letterSpacing:-0.5}}>Archives</h1>
              </div>
              <button className="hbtn" onClick={()=>{setFolderForm({label:"",sub:""});setEditFolder(null);setFolderModal(true);}} style={{...HBtn,background:`linear-gradient(135deg,#F5DC70,${YF.main})`,width:36,height:36}}>
                <Icon type="plus" size={16} color={YF.text}/>
              </button>
            </div>
            {archivedTickets.length>0&&<div style={{marginTop:10,padding:"8px 14px",background:`rgba(0,0,0,${theme.bg==="#e8e6e1"?0.05:0.04})`,borderRadius:12,border:"1px solid rgba(255,255,255,0.08)"}}><span style={{color:"rgba(255,255,255,0.4)",fontSize:11,fontFamily:"Outfit,sans-serif"}}>{archivedTickets.length} ticket{archivedTickets.length!==1?"s":""} archive{archivedTickets.length!==1?"s":""} · {fmt(archivedTickets.reduce((s,t)=>s+t.amount,0))}</span></div>}
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"0 16px 80px",perspective:"1000px",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain"}}>
            {folders.length===0&&<div style={{textAlign:"center",color:"rgba(255,255,255,0.2)",padding:"60px 0",fontSize:13,fontFamily:"Outfit,sans-serif"}}>Aucun dossier - creez-en un avec +</div>}
            {folders.map((f,i)=>(
              <ArchiveFolder key={f.id} folder={f} index={i} tickets={archivedTickets.filter(t=>t.archiveFolder===f.id)} isOpen={archiveOpen===f.id} onToggle={()=>setArchiveOpen(archiveOpen===f.id?null:f.id)} onEdit={()=>{setFolderForm({label:f.label,sub:f.sub});setEditFolder(f.id);setFolderModal(true);}} onDelete={()=>deleteFolder(f.id)} uiTheme={uiTheme}/>
            ))}
          </div>
        </>}

        {view==="stats"&&<>
          <div style={{padding:"14px 22px 0",flexShrink:0}}>
            <p style={{margin:0,color:`${theme.accent}99`,fontSize:10,fontWeight:500,letterSpacing:3,textTransform:"uppercase",fontFamily:"Outfit,sans-serif"}}>Analyse</p>
            <h1 style={{margin:"4px 0 0",color:"white",fontSize:28,fontWeight:700,fontFamily:"Outfit,sans-serif",letterSpacing:-0.5}}>Statistiques</h1>
          </div>
          <div style={{display:"flex",gap:6,padding:"12px 16px 0",flexShrink:0}}>
            {PERIODS.map((p,i)=><button key={i} onClick={()=>setStatPeriod(i)} style={{flex:1,height:28,borderRadius:9,border:"none",cursor:"pointer",background:statPeriod===i?`${theme.accent}33`:"rgba(255,255,255,0.05)",color:statPeriod===i?theme.accent:"rgba(255,255,255,0.3)",fontSize:10,fontWeight:statPeriod===i?600:400,fontFamily:"Outfit,sans-serif",transition:"all 0.2s"}}>{p.label}</button>)}
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"14px 16px 80px",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              {[{label:"Total",value:fmt(statData.total),sub:PERIODS[statPeriod].label,color:theme.accent},{label:"Tickets",value:statData.count,sub:"transactions",color:"#10B981"},{label:"Moyenne",value:statData.count>0?fmt(statData.total/statData.count):"---",sub:"par ticket",color:"#F59E0B"},{label:"Max",value:statData.biggest?fmt(statData.biggest.amount):"---",sub:statData.biggest?.label||"---",color:"#EC4899"}].map((k,i)=>(
                <div key={i} style={{background:theme.card,borderRadius:18,padding:"14px 16px",border:"1px solid rgba(255,255,255,0.08)"}}>
                  <div style={{color:"rgba(255,255,255,0.3)",fontSize:9,letterSpacing:1.5,textTransform:"uppercase",fontFamily:"Outfit,sans-serif",marginBottom:6}}>{k.label}</div>
                  <div style={{color:"white",fontSize:16,fontWeight:700,fontFamily:"Outfit,sans-serif",letterSpacing:-0.3}}>{k.value}</div>
                  <div style={{color:k.color,fontSize:9,fontFamily:"Outfit,sans-serif",marginTop:3}}>{k.sub}</div>
                </div>
              ))}
            </div>
            <div style={{background:theme.card,borderRadius:18,padding:"16px",border:"1px solid rgba(255,255,255,0.08)",marginBottom:14}}>
              <div style={{color:"rgba(255,255,255,0.3)",fontSize:9,letterSpacing:1.5,textTransform:"uppercase",fontFamily:"Outfit,sans-serif",marginBottom:12}}>Depenses mensuelles</div>
              <BarChart data={statData.bars} color={theme.accent}/>
            </div>
            <div style={{background:theme.card,borderRadius:18,padding:"16px",border:"1px solid rgba(255,255,255,0.08)"}}>
              <div style={{color:"rgba(255,255,255,0.3)",fontSize:9,letterSpacing:1.5,textTransform:"uppercase",fontFamily:"Outfit,sans-serif",marginBottom:12}}>Derniers tickets</div>
              {tickets.slice(0,5).map((t,i)=>{
                const ct=getCardTheme(uiTheme,t.cardTheme||0);
                return <div key={t.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<4?"1px solid rgba(255,255,255,0.04)":"none"}}>
                  <div style={{width:24,height:24,borderRadius:7,background:ct.grad,flexShrink:0}}/>
                  <div style={{flex:1,minWidth:0}}><div style={{color:"white",fontSize:12,fontFamily:"Outfit,sans-serif"}}>{t.label}</div><div style={{color:"rgba(255,255,255,0.3)",fontSize:9,fontFamily:"Outfit,sans-serif"}}>{t.date}</div></div>
                  <span style={{color:"white",fontSize:12,fontFamily:"Outfit,sans-serif"}}>{fmt(t.amount)}</span>
                </div>;
              })}
            </div>
          </div>
        </>}

        </div>

        {/* Overlay fermeture theme */}
        {activeTab==="theme"&&<div onClick={()=>setActiveTab("home")} style={{position:"absolute",inset:0,zIndex:50}}/>}

        {/* NAV BAR */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(10,10,10,0.97)",zIndex:51,backdropFilter:"blur(24px)",borderTop:"1px solid rgba(255,255,255,0.07)",zIndex:90}}>
          {activeTab==="theme"&&(
            <>
              <div style={{position:"relative",zIndex:11,padding:"14px 14px 10px",borderBottom:"1px solid rgba(255,255,255,0.06)",animation:"themePanel 0.28s cubic-bezier(0.22,1,0.36,1)"}}>
                <div style={{color:"rgba(255,255,255,0.25)",fontSize:8,letterSpacing:2,textTransform:"uppercase",fontFamily:"Outfit,sans-serif",marginBottom:10,textAlign:"center"}}>Style de l interface</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7}}>
                  {Object.values(THEMES).map(t=>(
                    <button key={t.id} onClick={()=>{setUiTheme(t.id);setActiveTab("home");}} className="theme-btn" style={{padding:"9px 6px 8px",borderRadius:12,border:"none",cursor:"pointer",background:uiTheme===t.id?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",outline:uiTheme===t.id?"1.5px solid rgba(255,255,255,0.3)":"1.5px solid transparent",transition:"all 0.18s"}}>
                      <div style={{width:20,height:20,borderRadius:6,background:t.accent,margin:"0 auto 6px",opacity:uiTheme===t.id?1:0.6}}/>
                      <div style={{color:uiTheme===t.id?"white":"rgba(255,255,255,0.45)",fontSize:9.5,fontWeight:uiTheme===t.id?700:500,fontFamily:"Outfit,sans-serif"}}>{t.label}</div>
                      <div style={{color:"rgba(255,255,255,0.2)",fontSize:7.5,fontFamily:"Outfit,sans-serif",marginTop:1}}>{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          <div style={{height:56,display:"flex",alignItems:"center"}}>
            {[{tab:"home",icon:"home",label:"Wallet"},{tab:"stats",icon:"stats",label:"Stats"},{tab:"archive",icon:"archive",label:"Archives"},{tab:"theme",icon:null,label:"Theme"}].map(({tab,icon,label})=>(
              <button key={tab} className="nav-btn" onClick={()=>{ if(tab==="theme"){setActiveTab(prev=>prev==="theme"?"home":"theme");}else{setActiveTab(tab);changeView(tab);} }} style={{flex:1,border:"none",background:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,paddingBottom:4,position:"relative"}}>
                {tab==="theme"?<div style={{width:20,height:20,borderRadius:6,background:theme.accent,opacity:activeTab==="theme"?1:0.35}}/>:<Icon type={icon} size={20} color={activeTab===tab?"white":"rgba(255,255,255,0.3)"}/>}
                <span style={{color:activeTab===tab?"white":"rgba(255,255,255,0.3)",fontSize:9,fontFamily:"Outfit,sans-serif",letterSpacing:0.5,fontWeight:activeTab===tab?600:400}}>{label}</span>
                {activeTab===tab&&<div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:16,height:2,borderRadius:1,background:theme.accent}}/>}
              </button>
            ))}
          </div>
        </div>

        {/* ADD SHEET */}
        {addSheet&&!addMode&&(
          <div style={{position:"absolute",inset:0,zIndex:180,background:"rgba(0,0,0,0.65)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)",animation:"fadeIn 0.2s"}} onClick={()=>setAddSheet(false)}>
            <div style={{width:"100%",background:"#111114",borderRadius:"28px 28px 0 0",padding:"0 18px 48px",animation:"slideUp 0.42s cubic-bezier(0.22,1,0.36,1)",border:"1px solid rgba(255,255,255,0.08)"}} onClick={e=>e.stopPropagation()}>
              <div style={{width:40,height:4,background:"rgba(255,255,255,0.2)",borderRadius:3,margin:"12px auto 22px"}}/>
              <div style={{color:"white",fontSize:18,fontWeight:700,fontFamily:"Outfit,sans-serif",marginBottom:6}}>Ajouter un ticket</div>
              <div style={{color:"rgba(255,255,255,0.3)",fontSize:12,fontFamily:"Outfit,sans-serif",marginBottom:22}}>Comment souhaitez-vous ajouter ce ticket ?</div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <button className="abtn" onClick={()=>setAddMode("manual")} style={{height:56,borderRadius:16,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.06)",color:"white",fontSize:14,fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,fontFamily:"Outfit,sans-serif"}}>
                  <Icon type="plus" size={18}/> Saisie manuelle
                </button>
                <button className="abtn" onClick={triggerAiScan} style={{height:56,borderRadius:16,border:"none",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"white",fontSize:14,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,fontFamily:"Outfit,sans-serif",boxShadow:"0 4px 18px rgba(99,102,241,0.35)"}}>
                  <Icon type="ai" size={18}/> Scan IA
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MANUAL FORM */}
        {addSheet&&addMode==="manual"&&(
          <div style={{position:"absolute",inset:0,zIndex:180,background:"rgba(0,0,0,0.65)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)",animation:"fadeIn 0.2s"}} onClick={()=>{setAddMode(null);setAddSheet(false);}}>
            <div style={{width:"100%",maxHeight:"82%",background:"#111114",borderRadius:"28px 28px 0 0",padding:"0 18px 44px",animation:"slideUp 0.42s cubic-bezier(0.22,1,0.36,1)",display:"flex",flexDirection:"column",overflow:"hidden",border:"1px solid rgba(255,255,255,0.08)"}} onClick={e=>e.stopPropagation()}>
              <div style={{width:40,height:4,background:"rgba(255,255,255,0.2)",borderRadius:3,margin:"12px auto 18px"}}/>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
                <button onClick={()=>setAddMode(null)} style={{background:"none",border:"none",cursor:"pointer",padding:0,opacity:0.5}}><Icon type="close" size={18}/></button>
                <div style={{color:"white",fontSize:18,fontWeight:600,fontFamily:"Outfit,sans-serif"}}>Nouveau ticket</div>
              </div>
              <div style={{overflowY:"auto",flex:1}}>
                {/* Libelle */}
                <div style={{marginBottom:12}}>
                  <div style={{color:"rgba(255,255,255,0.35)",fontSize:9,fontWeight:500,letterSpacing:1.5,textTransform:"uppercase",marginBottom:6,fontFamily:"Outfit,sans-serif"}}>Libellé *</div>
                  <input value={form.label} onChange={e=>setForm(p=>({...p,label:e.target.value}))} placeholder="Ex : Carrefour" style={{width:"100%",padding:"12px 14px",borderRadius:12,border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.05)",color:"white",fontSize:14,fontFamily:"Outfit,sans-serif",outline:"none",boxSizing:"border-box"}}/>
                </div>
                {/* Montant */}
                <div style={{marginBottom:12}}>
                  <div style={{color:"rgba(255,255,255,0.35)",fontSize:9,fontWeight:500,letterSpacing:1.5,textTransform:"uppercase",marginBottom:6,fontFamily:"Outfit,sans-serif"}}>Montant (EUR) *</div>
                  <input value={form.amount} onChange={e=>setForm(p=>({...p,amount:e.target.value}))} placeholder="Ex : 42.50" inputMode="decimal" style={{width:"100%",padding:"12px 14px",borderRadius:12,border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.05)",color:"white",fontSize:14,fontFamily:"Outfit,sans-serif",outline:"none",boxSizing:"border-box"}}/>
                </div>
                {/* Date calendrier */}
                <div style={{marginBottom:12}}>
                  <div style={{color:"rgba(255,255,255,0.35)",fontSize:9,fontWeight:500,letterSpacing:1.5,textTransform:"uppercase",marginBottom:6,fontFamily:"Outfit,sans-serif"}}>Date</div>
                  <input type="date" value={form.date} max={new Date().toISOString().slice(0,10)} onChange={e=>setForm(p=>({...p,date:e.target.value}))} style={{width:"100%",padding:"12px 14px",borderRadius:12,border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.05)",color:"white",fontSize:14,fontFamily:"Outfit,sans-serif",outline:"none",boxSizing:"border-box",colorScheme:"dark"}}/>
                </div>
                {/* Articles */}
                <div style={{marginBottom:12}}>
                  <div style={{color:"rgba(255,255,255,0.35)",fontSize:9,fontWeight:500,letterSpacing:1.5,textTransform:"uppercase",marginBottom:6,fontFamily:"Outfit,sans-serif"}}>Articles (séparés par virgule)</div>
                  <input value={form.items} onChange={e=>setForm(p=>({...p,items:e.target.value}))} placeholder="Pain, Fromage, Yaourt..." style={{width:"100%",padding:"12px 14px",borderRadius:12,border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.05)",color:"white",fontSize:14,fontFamily:"Outfit,sans-serif",outline:"none",boxSizing:"border-box"}}/>
                </div>
                <button onClick={submitManual} style={{width:"100%",height:50,borderRadius:16,border:"none",background:`linear-gradient(135deg,${theme.accent}cc,${theme.accent})`,color:"#000",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"Outfit,sans-serif",boxShadow:`0 6px 24px ${theme.accent}44`,marginTop:6}}>
                  Ajouter le ticket
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TICKET DETAIL */}
        {detailT&&(()=>{
          const ct=getCardTheme(uiTheme,detailT.cardTheme||0);
          const textColor=ct.light?"rgba(10,5,0,0.9)":"rgba(255,255,255,0.95)";
          const subColor =ct.light?"rgba(10,5,0,0.5)":"rgba(255,255,255,0.45)";
          return (
            <div style={{position:"absolute",inset:0,zIndex:160,background:"rgba(0,0,0,0.65)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)",animation:"fadeIn 0.2s"}} onClick={()=>setDetailT(null)}>
              <div style={{width:"100%",background:"#111114",borderRadius:"28px 28px 0 0",animation:"slideUp 0.42s cubic-bezier(0.22,1,0.36,1)",overflow:"hidden",border:"1px solid rgba(255,255,255,0.08)"}} onClick={e=>e.stopPropagation()}>
                {/* Ticket zigzag pleine largeur */}
                <div className="receipt-shape-both" style={{background:ct.grad,padding:"20px 22px 18px",border:`1px solid ${ct.light?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.1)"}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                    <div>
                      <div style={{color:subColor,fontSize:9,letterSpacing:2,textTransform:"uppercase",fontFamily:"'Space Mono',monospace",marginBottom:4}}>#{String(detailT.id).slice(-6).padStart(6,"0")}</div>
                      <div style={{color:textColor,fontSize:22,fontWeight:700,fontFamily:"Outfit,sans-serif",letterSpacing:-0.5}}>{detailT.label}</div>
                      <div style={{color:subColor,fontSize:11,fontFamily:"'Courier Prime',monospace",marginTop:3}}>{detailT.date}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{color:subColor,fontSize:9,letterSpacing:2,textTransform:"uppercase",fontFamily:"'Space Mono',monospace",marginBottom:4}}>Total</div>
                      <div style={{color:ct.accent,fontSize:24,fontWeight:700,fontFamily:"'Space Mono',monospace",letterSpacing:-1}}>{fmt(detailT.amount)}</div>
                    </div>
                  </div>
                  <div style={{borderTop:`1px dashed ${subColor}`,margin:"8px 0",opacity:0.4}}/>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:6}}>
                    <Barcode color={ct.light?"rgba(0,0,0,0.4)":"rgba(255,255,255,0.3)"} opacity={1}/>
                    <div style={{color:subColor,fontSize:7,fontFamily:"'Space Mono',monospace",letterSpacing:0.5}}>TXN-{String(detailT.id).padStart(9,"0")}</div>
                  </div>
                </div>
                <div style={{padding:"16px 18px 0"}}>
                  {detailT.items?.length>0&&(
                    <div style={{background:"rgba(255,255,255,0.05)",borderRadius:14,overflow:"hidden",marginBottom:14}}>
                      {detailT.items.map((item,i)=>(
                        <div key={i} style={{padding:"11px 14px",borderBottom:i<detailT.items.length-1?"1px solid rgba(255,255,255,0.05)":"none",color:"rgba(255,255,255,0.6)",fontSize:13,fontFamily:"'Courier Prime',monospace"}}>{item}</div>
                      ))}
                    </div>
                  )}
                  {detailT.archived&&<div style={{background:"rgba(255,200,80,0.08)",borderRadius:10,padding:"8px 14px",marginBottom:14,border:"1px solid rgba(255,200,80,0.15)"}}><span style={{color:"rgba(255,200,80,0.7)",fontSize:11,fontFamily:"Outfit,sans-serif"}}>Archive dans {folders.find(f=>f.id===detailT.archiveFolder)?.label||"un dossier"}</span></div>}
                  <div style={{display:"flex",gap:8,paddingBottom:40}}>
                    {!detailT.archived
                      ?<button className="abtn" onClick={()=>{setArchivePick(detailT);setDetailT(null);}} style={{flex:1,height:48,borderRadius:14,border:"none",background:`linear-gradient(135deg,${YF.main},#E8C85A)`,color:"#0A0A00",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:"Outfit,sans-serif"}}>
                          <Icon type="archive" size={15} color="#0A0A00"/> Archiver
                        </button>
                      :<button className="abtn" onClick={()=>unarchiveTicket(detailT.id)} style={{flex:1,height:48,borderRadius:14,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"white",fontSize:13,fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:"Outfit,sans-serif"}}>
                          <Icon type="inbox" size={15}/> Remettre dans le wallet
                        </button>
                    }
                    <button className="abtn" onClick={()=>deleteTicket(detailT.id)} style={{width:48,height:48,borderRadius:14,border:"none",background:"rgba(255,59,48,0.1)",color:"#ff3b30",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <Icon type="trash" size={16} color="#ff3b30"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ARCHIVE PICKER */}
        {archivePick&&(
          <div style={{position:"absolute",inset:0,zIndex:200,background:"rgba(0,0,0,0.72)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)",animation:"fadeIn 0.2s"}} onClick={()=>setArchivePick(null)}>
            <div style={{width:"100%",background:"#111114",borderRadius:"28px 28px 0 0",padding:"0 18px 48px",animation:"slideUp 0.42s cubic-bezier(0.22,1,0.36,1)",border:"1px solid rgba(255,255,255,0.08)"}} onClick={e=>e.stopPropagation()}>
              <div style={{width:40,height:4,background:"rgba(255,255,255,0.2)",borderRadius:3,margin:"12px auto 20px"}}/>
              <div style={{color:"white",fontSize:17,fontWeight:700,fontFamily:"Outfit,sans-serif",marginBottom:4}}>Archiver le ticket</div>
              <div style={{color:"rgba(255,255,255,0.3)",fontSize:12,fontFamily:"Outfit,sans-serif",marginBottom:18}}>Choisir un dossier pour {archivePick?.label}</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {folders.map(f=>(
                  <button key={f.id} className="abtn" onClick={()=>archiveTicket(archivePick.id,f.id)} style={{height:52,borderRadius:14,border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.05)",color:"white",fontSize:14,fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",gap:12,padding:"0 16px",fontFamily:"Outfit,sans-serif"}}>
                    <div style={{width:10,height:10,borderRadius:3,background:f.color,flexShrink:0}}/>
                    <span style={{flex:1}}>{f.label}</span>
                    <span style={{color:"rgba(255,255,255,0.25)",fontSize:11}}>{archivedTickets.filter(t=>t.archiveFolder===f.id).length} tickets</span>
                  </button>
                ))}
                {folders.length===0&&<div style={{textAlign:"center",color:"rgba(255,255,255,0.2)",padding:"16px 0",fontSize:12,fontFamily:"Outfit,sans-serif"}}>Aucun dossier - creez-en un dans les Archives</div>}
              </div>
            </div>
          </div>
        )}

        {/* FOLDER MODAL */}
        {folderModal&&(
          <div style={{position:"absolute",inset:0,zIndex:210,background:"rgba(0,0,0,0.65)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)",animation:"fadeIn 0.2s"}} onClick={()=>setFolderModal(false)}>
            <div style={{width:"100%",background:"#111114",borderRadius:"28px 28px 0 0",padding:"0 18px 44px",animation:"slideUp 0.42s cubic-bezier(0.22,1,0.36,1)",border:"1px solid rgba(255,255,255,0.08)"}} onClick={e=>e.stopPropagation()}>
              <div style={{width:40,height:4,background:"rgba(255,255,255,0.2)",borderRadius:3,margin:"12px auto 18px"}}/>
              <div style={{color:"white",fontSize:18,fontWeight:600,fontFamily:"Outfit,sans-serif",marginBottom:18}}>{editFolder?"Modifier le dossier":"Nouveau dossier"}</div>
              {[{key:"label",label:"Nom *",ph:"Ex : Depenses du mois"},{key:"sub",label:"Description",ph:"Ex : Tickets du quotidien"}].map(({key,label,ph})=>(
                <div key={key} style={{marginBottom:12}}>
                  <div style={{color:"rgba(255,255,255,0.35)",fontSize:9,letterSpacing:1.5,textTransform:"uppercase",marginBottom:6,fontFamily:"Outfit,sans-serif"}}>{label}</div>
                  <input value={folderForm[key]} onChange={e=>setFolderForm(p=>({...p,[key]:e.target.value}))} placeholder={ph} style={{width:"100%",padding:"12px 14px",borderRadius:12,border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.05)",color:"white",fontSize:14,fontFamily:"Outfit,sans-serif",outline:"none"}}/>
                </div>
              ))}
              <button onClick={saveFolder} style={{width:"100%",height:50,borderRadius:16,border:"none",background:`linear-gradient(135deg,#F5DC70,${YF.main})`,color:YF.text,fontSize:14,fontWeight:700,cursor:"pointer",marginTop:8,fontFamily:"Outfit,sans-serif"}}>{editFolder?"Enregistrer":"Creer le dossier"}</button>
            </div>
          </div>
        )}

        {/* AI SCAN */}
        {aiPhase>0&&(
          <div style={{position:"absolute",inset:0,zIndex:220,background:"rgba(0,0,0,0.96)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
            {(aiPhase===1||aiPhase===2)&&<>
              <div style={{width:200,height:260,borderRadius:20,border:"1.5px solid rgba(99,102,241,0.5)",position:"relative",overflow:"hidden",background:"rgba(99,102,241,0.04)",marginBottom:28}}>
                {["tl","tr","bl","br"].map(c=><div key={c} style={{position:"absolute",width:22,height:22,top:c.includes("t")?10:"auto",bottom:c.includes("b")?10:"auto",left:c.includes("l")?10:"auto",right:c.includes("r")?10:"auto",borderTop:c.includes("t")?"2px solid #6366f1":"none",borderBottom:c.includes("b")?"2px solid #6366f1":"none",borderLeft:c.includes("l")?"2px solid #6366f1":"none",borderRight:c.includes("r")?"2px solid #6366f1":"none"}}/>)}
                <div style={{position:"absolute",left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#6366f1,transparent)",animation:"scanMove 1.8s ease-in-out infinite",boxShadow:"0 0 14px #6366f1"}}/>
                {aiPhase===2&&<div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(99,102,241,0.08)"}}><div style={{color:"#6366f1",fontSize:12,fontFamily:"Outfit,sans-serif",animation:"pulse 1s infinite",textAlign:"center",lineHeight:1.8}}>Lecture du ticket...<br/>Extraction des données...</div></div>}
              </div>
              <div style={{color:"white",fontSize:14,fontWeight:500,fontFamily:"Outfit,sans-serif",marginBottom:10}}>{aiPhase===1?"Scan en cours...":"Reconnaissance IA..."}</div>
              {aiPhase===1&&<div style={{width:180,height:3,background:"rgba(255,255,255,0.1)",borderRadius:2,overflow:"hidden"}}><div style={{width:scanPct+"%",height:"100%",background:"linear-gradient(90deg,#6366f1,#8b5cf6)",borderRadius:2,transition:"width 0.06s"}}/></div>}
              <button onClick={()=>{setAiPhase(0);setAiResult(null);}} style={{marginTop:24,background:"none",border:"1px solid rgba(255,255,255,0.15)",borderRadius:12,padding:"8px 20px",color:"rgba(255,255,255,0.4)",fontSize:12,cursor:"pointer",fontFamily:"Outfit,sans-serif"}}>Annuler</button>
            </>}
            {aiPhase===3&&aiResult&&(()=>{
              const ct=getCardTheme(uiTheme,aiResult.cardTheme||0);
              return <>
                <div style={{width:"100%",borderRadius:20,overflow:"hidden",marginBottom:16,boxShadow:"0 20px 60px rgba(0,0,0,0.6)"}}>
                  <div style={{height:80,background:ct.grad,padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",top:-15,right:-15,width:80,height:80,borderRadius:"50%",background:`${ct.accent}15`}}/>
                    <div style={{color:ct.light?"rgba(10,5,0,0.9)":"white",fontSize:18,fontWeight:700,fontFamily:"Outfit,sans-serif"}}>{aiResult.label}</div>
                    <div style={{color:ct.accent,fontSize:20,fontWeight:700,fontFamily:"'Space Mono',monospace"}}>{fmt(aiResult.amount)}</div>
                  </div>
                  <div style={{background:"#111114",padding:"12px 20px"}}>
                    <div style={{color:"#6366f1",fontSize:11,fontFamily:"Outfit,sans-serif",marginBottom:4}}>Confiance IA : {aiResult.confidence}%</div>
                    <div style={{color:"rgba(255,255,255,0.3)",fontSize:11,fontFamily:"'Courier Prime',monospace"}}>{aiResult.date}</div>
                  </div>
                </div>
                <button onClick={confirmAi} style={{width:"100%",height:50,borderRadius:16,border:"none",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"white",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"Outfit,sans-serif",boxShadow:"0 6px 24px rgba(99,102,241,0.4)",marginBottom:10}}>Ajouter ce ticket</button>
                <button onClick={()=>{setAiPhase(0);setAiResult(null);}} style={{width:"100%",height:44,borderRadius:16,border:"1px solid rgba(255,255,255,0.1)",background:"none",color:"rgba(255,255,255,0.4)",fontSize:13,cursor:"pointer",fontFamily:"Outfit,sans-serif"}}>Annuler</button>
              </>;
            })()}
          </div>
        )}

        {toast&&<div style={{position:"absolute",top:70,left:16,right:16,zIndex:260,background:"#1c1c1e",border:"1px solid rgba(255,255,255,0.08)",borderRadius:18,padding:"13px 18px",color:"rgba(255,255,255,0.85)",fontSize:13,fontFamily:"Outfit,sans-serif",textAlign:"center",animation:"toastIn 0.3s ease",boxShadow:"0 12px 40px rgba(0,0,0,0.6)"}}>{toast}</div>}
        <input ref={fileRef} type="file" hidden onChange={onFile} accept="image/*,application/pdf"/>
    </div>
  );
}

const Ph   = {}; // fullscreen mobile
const HBtn = {width:34,height:34,borderRadius:17,border:"none",background:"rgba(255,255,255,0.08)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"};

const CSS = `
  @keyframes slideUp  {from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
  @keyframes fadeIn   {from{opacity:0}to{opacity:1}}
  @keyframes toastIn  {from{transform:translateY(-14px);opacity:0}to{transform:translateY(0);opacity:1}}
  @keyframes scanMove {0%{top:4%}50%{top:90%}100%{top:4%}}
  @keyframes pulse    {0%,100%{opacity:1}50%{opacity:0.4}}
  @keyframes viewIn   {from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes viewOut  {from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-8px)}}
  @keyframes rowSlide {from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
  @keyframes themePanel{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

  .receipt-shape-both {
    clip-path: polygon(
      0% 2.5%, 1% 0%, 2% 2.5%, 3% 0%, 4% 2.5%, 5% 0%, 6% 2.5%, 7% 0%, 8% 2.5%, 9% 0%, 10% 2.5%, 11% 0%, 12% 2.5%, 13% 0%, 14% 2.5%, 15% 0%, 16% 2.5%, 17% 0%, 18% 2.5%, 19% 0%, 20% 2.5%, 21% 0%, 22% 2.5%, 23% 0%, 24% 2.5%, 25% 0%, 26% 2.5%, 27% 0%, 28% 2.5%, 29% 0%, 30% 2.5%, 31% 0%, 32% 2.5%, 33% 0%, 34% 2.5%, 35% 0%, 36% 2.5%, 37% 0%, 38% 2.5%, 39% 0%, 40% 2.5%, 41% 0%, 42% 2.5%, 43% 0%, 44% 2.5%, 45% 0%, 46% 2.5%, 47% 0%, 48% 2.5%, 49% 0%, 50% 2.5%, 51% 0%, 52% 2.5%, 53% 0%, 54% 2.5%, 55% 0%, 56% 2.5%, 57% 0%, 58% 2.5%, 59% 0%, 60% 2.5%, 61% 0%, 62% 2.5%, 63% 0%, 64% 2.5%, 65% 0%, 66% 2.5%, 67% 0%, 68% 2.5%, 69% 0%, 70% 2.5%, 71% 0%, 72% 2.5%, 73% 0%, 74% 2.5%, 75% 0%, 76% 2.5%, 77% 0%, 78% 2.5%, 79% 0%, 80% 2.5%, 81% 0%, 82% 2.5%, 83% 0%, 84% 2.5%, 85% 0%, 86% 2.5%, 87% 0%, 88% 2.5%, 89% 0%, 90% 2.5%, 91% 0%, 92% 2.5%, 93% 0%, 94% 2.5%, 95% 0%, 96% 2.5%, 97% 0%, 98% 2.5%, 99% 0%, 100% 2.5%,
      100% 97.5%,
      100% 97.5%, 99% 100%, 98% 97.5%, 97% 100%, 96% 97.5%, 95% 100%, 94% 97.5%, 93% 100%, 92% 97.5%, 91% 100%, 90% 97.5%, 89% 100%, 88% 97.5%, 87% 100%, 86% 97.5%, 85% 100%, 84% 97.5%, 83% 100%, 82% 97.5%, 81% 100%, 80% 97.5%, 79% 100%, 78% 97.5%, 77% 100%, 76% 97.5%, 75% 100%, 74% 97.5%, 73% 100%, 72% 97.5%, 71% 100%, 70% 97.5%, 69% 100%, 68% 97.5%, 67% 100%, 66% 97.5%, 65% 100%, 64% 97.5%, 63% 100%, 62% 97.5%, 61% 100%, 60% 97.5%, 59% 100%, 58% 97.5%, 57% 100%, 56% 97.5%, 55% 100%, 54% 97.5%, 53% 100%, 52% 97.5%, 51% 100%, 50% 97.5%, 49% 100%, 48% 97.5%, 47% 100%, 46% 97.5%, 45% 100%, 44% 97.5%, 43% 100%, 42% 97.5%, 41% 100%, 40% 97.5%, 39% 100%, 38% 97.5%, 37% 100%, 36% 97.5%, 35% 100%, 34% 97.5%, 33% 100%, 32% 97.5%, 31% 100%, 30% 97.5%, 29% 100%, 28% 97.5%, 27% 100%, 26% 97.5%, 25% 100%, 24% 97.5%, 23% 100%, 22% 97.5%, 21% 100%, 20% 97.5%, 19% 100%, 18% 97.5%, 17% 100%, 16% 97.5%, 15% 100%, 14% 97.5%, 13% 100%, 12% 97.5%, 11% 100%, 10% 97.5%, 9% 100%, 8% 97.5%, 7% 100%, 6% 97.5%, 5% 100%, 4% 97.5%, 3% 100%, 2% 97.5%, 1% 100%, 0% 97.5%,
      0% 97.5%
    );
  }

  .wcard-wrapper:hover{transform:translateY(-6px)!important}
  .wcard-wrapper:active{transform:scale(0.975)!important}
  .acard{transition:filter 0.15s}
  .acard:hover{filter:brightness(1.05)!important}
  .acard:active{transform:scale(0.99)!important}
  .rrow{transition:background 0.15s,transform 0.12s}
  .rrow:hover{background:rgba(255,255,255,0.06)!important;transform:translateX(3px)}
  .rrow:active{transform:scale(0.99)}
  .abtn,.hbtn{transition:transform 0.15s cubic-bezier(0.34,1.56,0.64,1),filter 0.12s}
  .abtn:hover,.hbtn:hover{transform:scale(1.06);filter:brightness(1.08)}
  .abtn:active,.hbtn:active{transform:scale(0.94)}
  .nav-btn{transition:transform 0.15s cubic-bezier(0.34,1.56,0.64,1)}
  .nav-btn:active{transform:scale(0.88)}
  .theme-btn{transition:transform 0.2s cubic-bezier(0.34,1.56,0.64,1),outline 0.15s,background 0.15s}
  .theme-btn:hover{transform:scale(1.04)}
  .theme-btn:active{transform:scale(0.95)}
  ::-webkit-scrollbar{display:none}
  *{box-sizing:border-box;-webkit-font-smoothing:antialiased}
  html,body{overflow:hidden;position:fixed;width:100%;height:100%}
  [style*="overflowY"]{-webkit-overflow-scrolling:touch;touch-action:pan-y}
  input::placeholder{color:rgba(255,255,255,0.22)}
`;
