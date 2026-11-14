MoodCoffee


The Story

I was learning React and wanted to build something that felt *real* not just another todo list.
I thought: what does a café waiter actually need? A simple screen to take an order, see the total, and hand the customer a receipt. That became MoodCoffee.
I started with a basic menu grid and a click to add interaction. Then I added category filtering. Then I figured out how to generate a PDF receipt using jsPDF. At some point I needed a way to pick images for new menu items  so I built a small custom dropdown component from scratch instead of pulling in a library.
None of it is perfect. But every piece of it taught me something about React  state, props, components, effects, and how to make them talk to each other.


What It Does

-  Browse a café menu (Drinks / Food / Coffee)
-  Click items to add them to an order
-  Remove items or clear the whole order
-  Export the order as a **PDF receipt** (auto-downloaded)
-  Add new menu items on the fly via a modal form
-  Toast notifications on key actions



Built With

- React  — Core framework — the whole point of the project
- jsPDF — To generate a downloadable PDF receipt
- react-toastify — Clean toast notifications without building them myself
- react-icons — Quick icon access
- Plain CSS — I wanted full control over the styling



What I Learned

- How to manage shared state across components using useState
- When and why to use useEffect
- How to lift state up and pass callbacks as props
- How to integrate a third-party library jsPDF into a React app
- The basics of conditional rendering and list rendering



 Run It Locally

```bash
git clone https://github.com/picosshotgam/MoodCoffee.git
cd MoodCoffee
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.




*Made with curiosity and a lot of café visits.*
