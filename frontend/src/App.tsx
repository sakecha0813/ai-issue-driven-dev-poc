import { useState, type FormEvent } from "react";

function App() {
  const [price, setPrice] = useState("");
  const [taxRate, setTaxRate] = useState("0.10");
  const [taxIncludedPrice, setTaxIncludedPrice] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setTaxIncludedPrice(null);
    setIsLoading(true);

    try {
      const query = new URLSearchParams({ price, taxRate });
      const response = await fetch(`/api/prices/tax-included?${query}`);
      const result: unknown = await response.json();

      if (!response.ok) {
        const message =
          typeof result === "object" &&
          result !== null &&
          "error" in result &&
          typeof result.error === "string"
            ? result.error
            : "価格を計算できませんでした。";
        throw new Error(message);
      }

      if (
        typeof result !== "object" ||
        result === null ||
        !("taxIncludedPrice" in result) ||
        typeof result.taxIncludedPrice !== "number"
      ) {
        throw new Error("サーバーからの応答が正しくありません。");
      }

      setTaxIncludedPrice(result.taxIncludedPrice);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "価格を計算できませんでした。"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="calculator">
      <h1>税込価格計算</h1>
      <form onSubmit={calculate}>
        <label htmlFor="price">税抜価格</label>
        <input
          id="price"
          name="price"
          type="number"
          min="0"
          step="any"
          required
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />

        <label htmlFor="taxRate">税率（例：0.10）</label>
        <input
          id="taxRate"
          name="taxRate"
          type="number"
          min="0"
          step="any"
          required
          value={taxRate}
          onChange={(event) => setTaxRate(event.target.value)}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "計算中..." : "計算"}
        </button>
      </form>

      {taxIncludedPrice !== null && (
        <p className="result" role="status">
          税込価格: {taxIncludedPrice}
        </p>
      )}
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
    </main>
  );
}

export default App;
