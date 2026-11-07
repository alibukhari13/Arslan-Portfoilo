export const projectStories = {
  "working-trust": {
    overview:
      "Working Trust is a freelance workspace for profile, proposals, jobs, and earnings. The interface keeps the next action obvious, so a person can move from looking at work to hiring without a second explanation.",
    overviewNote:
      "Each area shares the same type, spacing, and components, so the product feels like one tool rather than four separate screens.",
    challenge:
      "A marketplace only works when posting work, comparing people, and hiring feel obvious on the first pass. The file had to hold a lot of information without hiding the primary action.",
    solution:
      "The flow starts with the profile, then proposals, jobs, and earnings. Repeated patterns carry the person through, and the handoff file names every state a developer needs.",
    impactIntro: "The workspace is built so a person can move from a profile to a hire without a second explanation.",
    impacts: [
      { value: "04", label: "Areas in one workspace" },
      { value: "01", label: "Path from profile to hire" },
      { value: "UI", label: "Developer-ready handoff" },
    ],
  },
  "todo-task-app": {
    overview:
      "A task app organized around capturing work quickly and seeing the day at a glance. The home screen answers what is due before it asks for a new task.",
    overviewNote: "Short sessions on a phone shaped the spacing, the type size, and how much of the day is visible without scrolling.",
    challenge: "Task apps fail when adding an item takes longer than doing it. The design had to stay fast on a small screen.",
    solution: "Capture sits above the day view. States for empty, due, and done use one component set so the file stays easy to build.",
    impactIntro: "The home screen answers what is due before it asks anyone to add another task.",
    impacts: [
      { value: "01", label: "Day view" },
      { value: "02", label: "Capture and review" },
      { value: "UI", label: "Mobile handoff" },
    ],
  },
  "moko-mattress": {
    overview: "A product landing page that leads with the offer, the proof, and a clear way to buy.",
    overviewNote: "The page is paced like a conversation: what it is, why it is worth it, then the purchase.",
    challenge: "Product pages lose people when the offer, the proof, and the buy button compete. One of those had to lead.",
    solution: "The first screen carries the offer. Proof follows in a short sequence, and the purchase stays available as the page moves.",
    impactIntro: "The first screen carries the offer. Proof and the purchase follow in that order.",
    impacts: [
      { value: "01", label: "Offer on the first screen" },
      { value: "03", label: "Proof, then purchase" },
      { value: "UI", label: "Responsive landing file" },
    ],
  },
  nexpay: {
    overview: "A finance app focused on balances, transfers, and trust at the moment of payment.",
    overviewNote: "The balance, the action, and the consequence are visible before anyone confirms a transfer.",
    challenge: "Fintech screens fail when the amount and the result are easy to miss. The design had to slow the confirm without slowing the rest of the app.",
    solution: "Balances lead. Transfers use a short sequence, and the confirm screen repeats the amount in the same place every time.",
    impactIntro: "The amount and the result stay in the same place from the balance through the confirm screen.",
    impacts: [
      { value: "01", label: "Balance before action" },
      { value: "02", label: "Transfer, then confirm" },
      { value: "UI", label: "Fintech handoff" },
    ],
  },
  frenco: {
    overview: "An eCommerce agency site for services, proof, and a clear way to start a project.",
    overviewNote: "The page introduces the studio, shows the kind of work, and gives the enquiry a fixed place.",
    challenge: "Agency sites often explain everything and ask for nothing. The start of a project had to stay visible.",
    solution: "Services and proof share one grid. The enquiry is the repeated action, from the first screen through the footer of the study.",
    impactIntro: "Services and proof share one grid, and the enquiry stays available from the first screen onward.",
    impacts: [
      { value: "01", label: "Way to start a project" },
      { value: "02", label: "Services and proof" },
      { value: "UI", label: "Website handoff" },
    ],
  },
  "portfolio-landing": {
    overview: "A personal landing page that introduces the work before the biography.",
    overviewNote: "The first screen is the work. The story of the person comes after someone has seen a frame.",
    challenge: "Portfolio landings often open with a long introduction. The work had to arrive first.",
    solution: "Selected frames lead. A short line of context sits with each one, and the biography is a later section.",
    impactIntro: "Selected work arrives first. The biography waits until a frame has been seen.",
    impacts: [
      { value: "01", label: "Work before biography" },
      { value: "02", label: "Frame, then context" },
      { value: "UI", label: "Landing handoff" },
    ],
  },
  "saas-landing": {
    overview: "A product homepage that explains the tool, the audience, and the first action.",
    overviewNote: "The headline says what the product does. The next block says who it is for. The button is the same action throughout.",
    challenge: "SaaS homepages pile features before the reader knows what the product is. The order had to be simpler.",
    solution: "One promise, one audience, then the feature set. The first action stays in the same place as the page continues.",
    impactIntro: "One promise, one audience, then the feature set. The first action does not move.",
    impacts: [
      { value: "01", label: "Promise on the first screen" },
      { value: "03", label: "Tool, audience, action" },
      { value: "UI", label: "Homepage handoff" },
    ],
  },
  "fine-dining": {
    overview: "A restaurant site paced like a menu: atmosphere first, then hours, dishes, and a reservation.",
    overviewNote: "The photography carries the room. The text stays short enough to read before a reservation.",
    challenge: "Restaurant sites either hide the booking or bury the food. Both had to be reachable without a long scroll hunt.",
    solution: "Atmosphere opens the page. Hours and dishes follow in a fixed order, and the reservation is the repeated action.",
    impactIntro: "Atmosphere opens the page. Hours, dishes, and the reservation stay in a fixed order.",
    impacts: [
      { value: "01", label: "Reservation kept in reach" },
      { value: "04", label: "Room, hours, dishes, book" },
      { value: "UI", label: "Website handoff" },
    ],
  },
  "food-delivery-app": {
    overview: "Browse, customize, and track an order in a flow that stays short on a phone.",
    overviewNote: "Each step fits one hand. The order summary stays visible when a choice changes the total.",
    challenge: "Delivery apps add steps until the meal is harder to order than to cook. The flow had to stay short.",
    solution: "Browse, customize, and track are three screens with shared components. The total updates in the same place on each one.",
    impactIntro: "Browse, customize, and track stay short enough to finish with one hand.",
    impacts: [
      { value: "03", label: "Browse, customize, track" },
      { value: "01", label: "Total kept in view" },
      { value: "UI", label: "Mobile handoff" },
    ],
  },
  "supplement-hydration": {
    overview: "A storefront for supplements with product proof, variants, and a straightforward cart.",
    overviewNote: "The product screen shows what it is, which variant is selected, and how to add it, in that order.",
    challenge: "Stores lose the variant and the cart in separate patterns. A person should not have to relearn the page for each product.",
    solution: "Proof, variant, and cart use one product template. The cart count stays available while the catalog changes.",
    impactIntro: "Proof, the selected variant, and the cart use one product template.",
    impacts: [
      { value: "01", label: "Product template" },
      { value: "03", label: "Proof, variant, cart" },
      { value: "UI", label: "Storefront handoff" },
    ],
  },
  "food-delivery-web": {
    overview: "A delivery website that keeps restaurants, dishes, and checkout in one readable path.",
    overviewNote: "The path is the same on a wide screen as on a phone: choose a place, choose a dish, check out.",
    challenge: "Delivery websites split the menu and the checkout into different visual systems. The path had to stay one product.",
    solution: "Restaurants, dishes, and checkout share type, cards, and the order summary. Nothing important moves to a new pattern at the last step.",
    impactIntro: "The study is organized around the work itself, not a list of invented metrics.",
    impacts: [
      { value: "03", label: "Place, dish, checkout" },
      { value: "01", label: "Summary carried through" },
      { value: "UI", label: "Website handoff" },
    ],
  },
  "drone-website": {
    overview: "A product site for drones, built around specs, use cases, and a strong first impression.",
    overviewNote: "The first screen is the product. Specs and uses come next, in an order a buyer can scan.",
    challenge: "Hardware sites either hide the specs or open with a table. The impression and the facts both had to land.",
    solution: "A full first frame introduces the product. Specs and use cases follow as scannable blocks, with one enquiry action.",
    impactIntro: "The study is organized around the work itself, not a list of invented metrics.",
    impacts: [
      { value: "01", label: "Product on the first screen" },
      { value: "02", label: "Specs and use cases" },
      { value: "UI", label: "Product-site handoff" },
    ],
  },
  "travel-booking": {
    overview: "Search, compare, and book travel with filters that stay visible while the results change.",
    overviewNote: "Filters do not disappear when the list updates. The comparison stays next to the search.",
    challenge: "Booking tools hide the filters after the first search. People then cannot tell why the list changed.",
    solution: "Search, filters, and results stay in one view. Booking is a clear next step from a result, not a new product.",
    impactIntro: "The study is organized around the work itself, not a list of invented metrics.",
    impacts: [
      { value: "01", label: "Filters kept in view" },
      { value: "03", label: "Search, compare, book" },
      { value: "UI", label: "Booking handoff" },
    ],
  },
  vaultex: {
    overview: "A finance dashboard where balance, cash flow, and spending stay readable at a glance.",
    overviewNote: "The first screen answers what needs attention. The rest of the numbers support that answer.",
    challenge: "Dashboards fail when every number has the same weight. Someone should be able to see what needs them without reading the whole board.",
    solution: "Balance leads. Cash flow and spending use quieter type. The same card pattern repeats so the file stays buildable.",
    impactIntro: "The study is organized around the work itself, not a list of invented metrics.",
    impacts: [
      { value: "03", label: "Balance, flow, spending" },
      { value: "01", label: "Answer on the first screen" },
      { value: "UI", label: "Dashboard handoff" },
    ],
  },
};
