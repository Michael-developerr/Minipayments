function App() {
  const onClick = () => {
    fetch("https://paymentsexpress.onrender.com/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: "10.00",
        orderId: "123",
        userId: "123",
      }),
    })
      .then((res) => res.json())
      .then((data) => window.open(data?.payment?.confirmation?.confirmation_url));
  };
  return (
    <div>
      <button onClick={onClick}>Оплатить</button>
    </div>
  );
}

export default App;
