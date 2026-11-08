
"use client";

import { useState } from "react";

const journeys = [
  { id: 1, title: "Fundamentos da Fé", description: "Conheça os princípios essenciais da fé cristã.", icon: "✝️", color: "#e7d8ad", questions: ["Quem construiu a arca?", "Quantos discípulos Jesus escolheu?", "Onde Jesus nasceu?"] },
  { id: 2, title: "Personagens Bíblicos", description: "Descubra as histórias de homens e mulheres da Bíblia.", icon: "👑", color: "#d9e6d5", questions: ["Quem derrotou Golias?", "Quem foi engolido por um grande peixe?", "Quem interpretou os sonhos do faraó?"] },
  { id: 3, title: "Vida de Jesus", description: "Explore os ensinamentos e milagres de Jesus.", icon: "🕊️", color: "#dce5ed", questions: ["Em qual cidade Jesus nasceu?", "Qual foi seu primeiro milagre?", "Quem batizou Jesus?"] },
  { id: 4, title: "Antigo Testamento", description: "Explore a história do povo de Deus.", icon: "📜", color: "#eee0d0", questions: ["Quem recebeu os Dez Mandamentos?", "Quem foi o primeiro homem?", "Qual foi o primeiro livro da Bíblia?"] },
  { id: 5, title: "Novo Testamento", description: "Conheça a igreja primitiva e as cartas apostólicas.", icon: "📖", color: "#e2dff0", questions: ["Quem escreveu muitas cartas do Novo Testamento?", "Qual livro conta a história da igreja primitiva?", "Quem era cobrador de impostos antes de seguir Jesus?"] },
  { id: 6, title: "Desafio dos Mestres", description: "Teste seus conhecimentos em desafios especiais.", icon: "🏆", color: "#f0e2bd", questions: ["Quantos livros existem na Bíblia protestante?", "Quem sucedeu Moisés?", "Qual é o último livro da Bíblia?"] }
];

const answers = [
  [0, 1, 1],
  [1, 2, 2],
  [1, 1, 1],
  [1, 0, 0],
  [0, 1, 1],
  [1, 1, 2]
];

const options = [
  [["Noé", "Abraão", "Moisés"], ["10", "12", "7"], ["Belém", "Nazaré", "Jerusalém"]],
  [["Davi", "Saul", "Salomão"], ["Jonas", "Pedro", "Paulo"], ["José", "Daniel", "Moisés"]],
  [["Nazaré", "Belém", "Jerusalém"], ["Transformar água em vinho", "Multiplicar pães", "Curar um cego"], ["João Batista", "Pedro", "Paulo"]],
  [["Abraão", "Moisés", "Davi"], ["Adão", "Noé", "Enoque"], ["Gênesis", "Êxodo", "Salmos"]],
  [["Pedro", "Paulo", "João"], ["Atos dos Apóstolos", "Romanos", "Apocalipse"], ["Mateus", "Lucas", "Marcos"]],
  [["27", "66", "39"], ["Josué", "Arão", "Calebe"], ["Gênesis", "Judas", "Apocalipse"]]
];

export default function Home() {
  const [tab, setTab] = useState("home");
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [question, setQuestion] = useState(0);
  const [journey, setJourney] = useState(0);
  const [finished, setFinished] = useState(false);

  function startJourney(id: number) {
    setJourney(id);
    setQuestion(0);
    setSelected(null);
    setFinished(false);
    setTab("quiz");
  }

  function answerQuestion() {
    if (selected === null) return;
    if (selected === answers[journey][question]) setXp(v => v + 10);
    else setXp(v => v + 2);

    if (question === 2) {
      setCompleted(v => v.includes(journey) ? v : [...v, journey]);
      setFinished(true);
    } else {
      setQuestion(v => v + 1);
      setSelected(null);
    }
  }

  const current = journeys[journey];

  return (
    <main className="app">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">B</span><span>BÍBLIA <b>QUEST</b></span></div>
        <div className="xp-pill">✦ {xp} XP</div>
      </header>

      {tab === "home" && <section className="screen">
        <p className="eyebrow">SUA JORNADA COMEÇA AQUI</p>
        <h1>Conheça a Palavra.<br/><em>Fortaleça sua fé.</em></h1>
        <p className="muted">Aprenda, descubra e desafie seus conhecimentos bíblicos todos os dias.</p>
        <div className="daily-card">
          <div><span className="daily-label">✦ DESAFIO DO DIA</span><h2>Um novo desafio espera por você.</h2><p>Dedique alguns minutos à Palavra.</p><button onClick={() => startJourney(0)}>Começar desafio <span>→</span></button></div>
          <div className="daily-symbol">✝</div>
        </div>
        <div className="section-heading"><div><p className="eyebrow">CONTINUE EVOLUINDO</p><h2>Suas jornadas</h2></div><button className="text-button" onClick={() => setTab("journeys")}>Ver todas →</button></div>
        <div className="journey-list">{journeys.slice(0,3).map((j) => <button className="journey-row" key={j.id} onClick={() => startJourney(j.id-1)}><span className="journey-icon" style={{background:j.color}}>{j.icon}</span><span className="journey-info"><b>{j.title}</b><small>{j.description}</small></span><span className="arrow">›</span></button>)}</div>
      </section>}

      {tab === "journeys" && <section className="screen">
        <p className="eyebrow">APRENDA NO SEU RITMO</p><h1>Jornadas <em>bíblicas</em></h1><p className="muted">Cada jornada é uma oportunidade de aprender algo novo.</p>
        <div className="journey-list">{journeys.map((j) => <button className="journey-row" key={j.id} onClick={() => startJourney(j.id-1)}><span className="journey-icon" style={{background:j.color}}>{j.icon}</span><span className="journey-info"><b>{j.title}</b><small>{j.description}</small><small>{completed.includes(j.id-1) ? "✓ Concluída" : "3 perguntas • Iniciante"}</small></span><span className="arrow">›</span></button>)}</div>
      </section>}

      {tab === "challenges" && <section className="screen"><p className="eyebrow">TESTE SEU CONHECIMENTO</p><h1>Desafios <em>diários</em></h1><div className="daily-card"><div><span className="daily-label">DESAFIO ESPECIAL</span><h2>Você conhece as Escrituras?</h2><p>Responda às perguntas e conquiste XP.</p><button onClick={() => startJourney(5)}>Iniciar desafio →</button></div><div className="daily-symbol">🏆</div></div></section>}

      {tab === "profile" && <section className="screen"><p className="eyebrow">SUA EVOLUÇÃO</p><h1>Meu <em>perfil</em></h1><div className="profile-card"><div className="avatar">✝</div><h2>Explorador da Palavra</h2><p className="muted">Sua caminhada de conhecimento bíblico.</p><div className="stats"><div><b>{xp}</b><small>XP conquistados</small></div><div><b>{completed.length}</b><small>Jornadas concluídas</small></div><div><b>{completed.length * 3}</b><small>Respostas concluídas</small></div></div></div><h2 className="subheading">Plano atual</h2><div className="plan-card"><b>Plano gratuito</b><p>Continue aprendendo e evoluindo.</p><span>Premium em breve</span></div></section>}

      {tab === "quiz" && <section className="screen quiz-screen">
        <button className="back-button" onClick={() => setTab("journeys")}>← Voltar às jornadas</button>
        {!finished ? <>
          <p className="eyebrow">JORNADA {journey+1} DE 6</p><h1>{current.title}</h1>
          <div className="progress-track"><div style={{width:`${((question+1)/3)*100}%`}}/></div>
          <p className="question-count">PERGUNTA {question+1} DE 3</p>
          <h2 className="question-title">{current.questions[question]}</h2>
          <div className="options">{options[journey][question].map((option,i) => <button key={i} className={`option ${selected===i?"selected":""}`} onClick={() => setSelected(i)}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}</div>
          <button className="primary-button" disabled={selected===null} onClick={answerQuestion}>Confirmar resposta →</button>
        </> : <div className="finished"><div className="trophy">🏆</div><p className="eyebrow">JORNADA CONCLUÍDA</p><h1>Parabéns!</h1><p className="muted">Você completou esta etapa da sua jornada de conhecimento.</p><div className="reward">✦ XP acumulado: continue evoluindo!</div><button className="primary-button" onClick={() => setTab("journeys")}>Voltar às jornadas</button><button className="text-button" onClick={() => setTab("home")}>Ir para início</button></div>}
      </section>}

      <nav className="bottom-nav">
        {[["home","⌂","Início"],["journeys","▤","Jornadas"],["challenges","✦","Desafios"],["profile","♙","Perfil"]].map(([id,icon,label]) => <button key={id} className={tab===id?"active":""} onClick={() => setTab(id)}><span>{icon}</span>{label}</button>)}
      </nav>
    </main>
  );
}
