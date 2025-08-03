# data-validation-benchmark

## How to run the benchmark

#### Clone the Repository
Open your terminal and run:
```shell
git clone git@github.com:typescript-tutorial/data-validation-benchmark.git
```

#### Install Dependencies
Make sure you have Node.js and npm installed. Then run:
```shell
npm install
```

#### Run the Benchmark
Run the Benchmark with typescript directly:
```shell
npx tsx ./src/app.ts
```

## Benchmark Result:
<table><thead><tr>
<th><b>Rank</b></th>
<th><b>Library</b></th>
<th><b>Ops/sec</b></th>
<th><b>RME (%)</b></th>
<th><b>Samples</b></th>
<th><b>Size (min+gz)</b></th>
<th><b>Relative Speed (vs fastest)</b></th>
<th><b>Note</b></th>
</tr></thead><tbody>

<tr>
<td>🥇 1</td>
<td>Ajv</td>
<td>2,484,057</td>
<td>3.83%</td>
<td>78</td>
<td>~114 KB</td>
<td>🏆 1.00× (fastest)</td>
<td>Fastest + Heavier bundle</td>
</tr>

<tr>
<td>🥈 2</td>
<td>xvalidators</td>
<td>473,929</td>
<td>3.66%</td>
<td>85</td>
<td>~3.8 KB</td>
<td>~19.1% of Ajv</td>
<td>Very Fast + Small</td>
</tr>

<tr>
<td>🥉 3</td>
<td>Valibot</td>
<td>208,463</td>
<td>3.07%</td>
<td>78</td>
<td>~4 KB</td>
<td>~8.4% of Ajv</td>
<td>Fast + Small Size</td>
</tr>

<tr>
<td>4</td>
<td>Zod</td>
<td>187,866</td>
<td>7.54%</td>
<td>69</td>
<td>~25 KB</td>
<td>~7.6% of Ajv</td>
<td>Fast + Medium Size</td>
</tr>

<tr>
<td>5</td>
<td>Joi</td>
<td>49,806</td>
<td>3.49%</td>
<td>79</td>
<td>~80 KB</td>
<td>~2.0% of Ajv</td>
<td>Slow + Heavy Size</td>
</tr>

<tr>
<td>6</td>
<td>Yup</td>
<td>30,993</td>
<td>5.2%</td>
<td>76</td>
<td>~28 KB</td>
<td>~1.2% of Ajv</td>
<td>Slowest + Medium Size + Frontend-oriented</td>
</tr>

</tbody></table>

### 🧠 Key Insights
#### ✅ Ajv
- Top performer with ~2.48 million ops/sec. 
- Best for JSON Schema validation, high-throughput services. 
- Ideal for performance-critical Node.js or edge runtimes.
#### ✅ xvalidators
- ~5.2x slower than Ajv, but ~2.3x faster than Zod, and even faster than Valibot.
- xvalidators is focused on bundle small size + performance, good for frontend.
- Excellent TypeScript inference, flexible custom rules.
- Very good for internal tools, low-code platforms, or apps that require typed validation
#### ⚖️ Zod vs. Valibot
- Nearly similar in ops/sec, suggesting similar architecture or design trade-offs.
- Good for TypeScript-first developer experience but noticeably slower than Ajv/xvalidators.
- Both offer great DX.
- Valibot is focused on bundle size + performance, good for frontend.
- Zod still preferred if you need ecosystem maturity and developer ergonomics.
#### ❌ Joi and Yup
- Significantly slower, not suited for performance-sensitive applications. 
- Useful in some backend contexts (Joi) or form validation (Yup), but not recommended when performance matters.

### 🏁 Recommendation by Use Case 
<table><thead>

<tr>
<th>Use Case</th>
<th>Library</th>
<th>Reason</th>
</tr></thead><tbody>

<tr>
<td>High-throughput backend APIs</td>
<td><b>Ajv</b></td>
<td>Fastest JSON Schema validator</td>
</tr>

<tr>
<td>Minimal frontend apps with type-safe apps and custom rules</td>
<td><b>xvalidators</b></td>
<td>Good speed, excellent TypeScript integration</td>
</tr>

<tr>
<td>Minimal frontend apps</td>
<td><b>Valibot</b></td>
<td>Lightweight and efficient</td>
</tr>

<tr>
<td>DX-focused development</td>
<td><b>Zod</b></td>
<td>Clean syntax, popular, ideal for prototypes</td>
</tr>

<tr>
<td>Legacy/enterprise backend apps</td>
<td><b>Joi</b></td>
<td>Powerful features, but low performance</td>
</tr>

<tr>
<td>Form validation in React (Formik)</td>
<td><b>Yup</b></td>
<td>Integrated with form tools, but slow</td>
</tr>

</tbody></table>

### 📌 Summary
- If you need speed: → Ajv
- If you want typescript + good speed + small: → xvalidators
- If you prefer a big community support over speed: → Zod or Valibot
- If you already use Formik or legacy stack: → Yup or Joi