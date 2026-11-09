import { createRoot } from "react-dom/client"
import { DiscordEmbed, DiscordEmbedDescription, DiscordMessage, DiscordMessages } from "@skyra/discord-components-react"
import { Bell, ChevronDown, CircleHelp, Hash, LockKeyhole, Plus, Settings, Smile, Volume2 } from "lucide-react"
import "./intent-demo.css"

const screen = new URLSearchParams(location.search).get("screen") || "panel"
const title = screen === "privacy" ? "Privacy command" : screen === "conversation" ? "Private ticket conversation" : "Ticket creation panel"

function Buttons({ children }: { children: React.ReactNode }) {
  return <div className="demo-buttons">{children}</div>
}

function App() {
  return <>
    <div className="demo-notice">SYNTHETIC DEMO · NOT A SCREENSHOT FROM DISCORD</div>
    <div className="demo-app">
      <aside className="demo-servers"><div className="demo-server-home">●</div><div className="demo-server">L</div><div className="demo-server-add">+</div></aside>
      <aside className="demo-channels">
        <div className="demo-server-title">LoneDev Support <ChevronDown size={16} /></div>
        <div className="demo-channel-group">SUPPORT <ChevronDown size={13} /></div>
        <div className="demo-channel"><Hash size={19} /> guidelines</div>
        <div className={screen === "panel" ? "demo-channel active" : "demo-channel"}><Hash size={19} /> create-ticket</div>
        <div className="demo-channel-group">PRIVATE TICKETS <ChevronDown size={13} /></div>
        <div className={screen !== "panel" ? "demo-channel active" : "demo-channel"}><LockKeyhole size={18} /> payment-jamie</div>
        <div className="demo-channel"><Volume2 size={18} /> Support voice</div>
        <div className="demo-account"><div className="demo-avatar">S</div><div><strong>Test member</strong><small>Online</small></div><Settings size={17} /></div>
      </aside>
      <main className="demo-main">
        <header className="demo-top"><LockKeyhole size={20} /><strong>{screen === "panel" ? "create-ticket" : "payment-jamie"}</strong><span className="demo-top-topic">{title}</span><Bell size={19} /><CircleHelp size={19} /></header>
        <div className="demo-chat">
          <div className="demo-intro"><span className="demo-intro-icon"><Hash size={29} /></span><h1>{screen === "panel" ? "Welcome to #create-ticket" : "Welcome to #payment-jamie"}</h1><p>{screen === "panel" ? "Open a private support ticket below." : "This is the beginning of a private support thread."}</p></div>
          <div className="demo-divider"><span>Today</span></div>
          <DiscordMessages lightTheme={false}>
            {screen === "panel" && <DiscordMessage author="LoneDev's Tickets" bot timestamp="10:12" twentyFour>
              <DiscordEmbed slot="embeds" embedTitle="Private Support Ticket" color="#a0401a"><DiscordEmbedDescription slot="description">
                Private tickets are only for rare occasions. For plugin bugs use GitHub; for general help use the public support channels after verification. Read the tutorials and search Discord and GitHub before opening a ticket.<br /><br />
                Authorized support staff can manage your ticket through our private dashboard. Full conversation archiving is disabled pending Discord authorization.<br />
                Ticket data is retained while open and up to 30 days after closure.<br />
                <a href="https://tickets.example.com/privacy">Read the privacy policy</a> · Use /tickets-privacy for exclusion or deletion · Privacy contact: info@devs.beer
              </DiscordEmbedDescription></DiscordEmbed>
            </DiscordMessage>}
            {screen === "panel" && <div className="demo-after-message"><Buttons><button>Generic</button><button>Payment issue</button><button>My tickets</button></Buttons><Buttons><a href="https://tickets.example.com/privacy">Privacy policy ↗</a></Buttons></div>}
            {screen === "privacy" && <>
              <DiscordMessage author="Test member" avatar="https://cdn.discordapp.com/embed/avatars/3.png" timestamp="10:14" twentyFour>/tickets-privacy</DiscordMessage>
              <DiscordMessage author="LoneDev's Tickets" bot timestamp="10:14" twentyFour>
                <div className="demo-ephemeral">Only you can see this</div>
                Privacy and deletion: info@devs.beer<br /><a href="https://tickets.example.com/privacy">https://tickets.example.com/privacy</a><br />
                You can exclude your ticket content from the web copy or request deletion of your local data. Discord messages are unaffected.
              </DiscordMessage>
              <div className="demo-after-message"><Buttons><button>Exclude web copy</button><button className="danger">Delete my local data</button></Buttons></div>
            </>}
            {screen === "conversation" && <>
              <DiscordMessage author="Jamie Chen" avatar="https://cdn.discordapp.com/embed/avatars/3.png" timestamp="10:16" twentyFour>I cannot find the invoice for my recent order. The account page shows the order, but no download link.</DiscordMessage>
              <DiscordMessage author="Support staff" avatar="https://cdn.discordapp.com/embed/avatars/2.png" timestamp="10:18" twentyFour>Thanks, Jamie. Could you tell me which page you checked? Please do not share payment-card details here.</DiscordMessage>
              <DiscordMessage author="Jamie Chen" avatar="https://cdn.discordapp.com/embed/avatars/3.png" timestamp="10:21" twentyFour>I checked Account → Orders. The invoice link is missing there too. Can you help me locate it?</DiscordMessage>
            </>}
          </DiscordMessages>
        </div>
        <div className="demo-composer"><Plus size={20} /><span>Message #{screen === "panel" ? "create-ticket" : "payment-jamie"}</span><Smile size={20} /></div>
      </main>
      <aside className="demo-members"><div className="demo-members-heading">MEMBERS — 3</div><div><div className="demo-avatar bot">T</div> LoneDev's Tickets</div><div><div className="demo-avatar">S</div> Support staff</div><div><div className="demo-avatar user">J</div> Jamie Chen</div></aside>
    </div>
    <div className="demo-caption">Illustrative local rendering with synthetic accounts and ticket data. The Discord Gateway and Message Content access are not connected.</div>
  </>
}

createRoot(document.getElementById("root")!).render(<App />)
