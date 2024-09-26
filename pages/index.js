"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";

const theme = {
  primaryColor: "rgba(0, 168, 81, 1)",
  background: "rgba(0, 168, 81, 1)",
  onBackground: 'white',
}

const TIMEOUT = 5000; //3s

const styleText = {
  color: theme.primaryColor,
}

const styleTitle = {
  ...styleText,
  fontSize: 18,
  fontWeight: 600,
}

const styleInput = {
  borderStyle: 'solid',
  borderWidth: 0.6,
  borderRadius: 5,
  padding: 10,
  borderColor: theme.primaryColor,
}

function Form() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function addAwaitList(event) {
    try {
      event.preventDefault();
      setLoading(true);
      const data = event.currentTarget.elements;
      const name = data.name.value;
      const email = data.email.value;
      const description = data.description.value;
      await axios.post("/api/register", {
        name,
        email,
        description,
      });
      setLoading(false);
      setMessage("Seus dados foram adicionado com sucesso");
      setTimeout(() => {
        setMessage("");
      }, TIMEOUT);
      data.name.value = "";
      data.email.value = "";
      data.description.value = "";
    } catch (err) {
      setLoading(false);
      setMessage(err.message);
      setTimeout(() => {
        setMessage("");
      }, TIMEOUT);
    }
  }

  if (loading) {
    return (
      <div>
        <h3 style={styleText}>Carregando...</h3>
      </div>
    );
  }

  if (message) {
    return (
      <div>
        <h3 style={styleText}>{message}</h3>
      </div>
    );
  }

  return (
    <form onSubmit={addAwaitList} style={{ display: 'flex', flexDirection: 'column', alingItems: 'center', padding: 10, gap: 10}}>
      <label style={styleText} htmlFor="name">Nome</label>
      <input style={styleInput} id="name" name="name" />
      <label style={styleText} htmlFor="email">Email</label>
      <input style={styleInput} id="email" type="email" name="email" />
      <label style={styleText} htmlFor="description">Comentarios (opcional)</label>
      <textarea style={styleInput} id="description" name="description" rows={4} cols={40} />
      <button style={{
        backgroundColor: theme.background,
        color: theme.onBackground,
        borderRadius: 10,
        padding: 10
      }} type="submit">Enviar</button>
    </form>
  );
}

export default function Home() {
  return (
    <div style={{ gap: 10, display: 'flex', flexDirection: 'column', height: 100vh }}>
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        flex: 1,
      }}>
        <Image
          src="/logo-mb.png"
          alt="Construction logo"
          width={150}
          height={150}
          priority
        />
        <h1 style={{
          "color": theme.primaryColor,
          "textTransform":"none",
          "lineBreak":"auto",
          "overflowWrap":"initial",
          "whiteSpace":"break-spaces",
          "textRendering":"geometricPrecision",
          "caretColor":"rgba(0, 168, 81, 1)",
          "textDecoration":"none",
          "letterSpacing":"0px",
          "fontSize":"40px",
          "fontFamily":"\"sourcesanspro\"",
          "fontStyle":"normal",
          "fontWeight":"bold"        
        }}>Meu Bairro</h1>

      </header>
      <main style={{
        display:'flex',
        flexDirection: 'column',
        gap: 50,
        paddingTop: 20,
        paddingBottom: 20,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: 5}}>
          <h3 style={styleTitle}>Estamos em construção</h3>
          <h4 style={styleText}>Adicione seus dados para lista de espera.</h4>
        </div>
        <div style={{
          display:'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}>
          <Image
            src="/construction.png"
            alt="Construction logo"
            width={400}
            height={200}
            priority
          />
          <Form />
        </div>
      </main>
      <footer style={{
        backgroundColor: theme.background,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}>
        <span>2024</span> <div class="sc-beySPh cMXTmv"><svg fill="currentColor" viewBox="0 0 16 16" height="2rem" width="2rem" colo="#20134b"><path d="M1 8a7 7 0 1014 0A7 7 0 001 8zm15 0A8 8 0 110 8a8 8 0 0116 0zM5.408 5.89c-.83 0-1.318.64-1.318 1.753v.742c0 1.108.479 1.727 1.318 1.727.69 0 1.138-.435 1.187-1.05h1.147v.114c-.058 1.147-1.029 1.938-2.343 1.938-1.612 0-2.518-1.028-2.518-2.729v-.747c0-1.7.914-2.75 2.518-2.75 1.319 0 2.29.812 2.343 1.999v.11H6.595c-.049-.638-.506-1.108-1.187-1.108zm5.404 0c-.831 0-1.319.64-1.319 1.753v.742c0 1.108.48 1.727 1.319 1.727.69 0 1.138-.435 1.186-1.05h1.147v.114c-.057 1.147-1.028 1.938-2.342 1.938-1.613 0-2.518-1.028-2.518-2.729v-.747c0-1.7.914-2.75 2.518-2.75 1.318 0 2.29.812 2.342 1.999v.11h-1.147c-.048-.638-.505-1.108-1.186-1.108z"></path></svg><span class="sc-guDLey jqCWlQ"></span></div> <span>Enieber Cunha da Silva</span>
      </footer>
    </div>
  );
}

