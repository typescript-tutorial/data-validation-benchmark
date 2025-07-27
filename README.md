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
<th><b>Library</b></th>
<th><b>Ops/sec</b></th>
<th><b>RME (%)</b></th>
<th><b>Samples</b></th>
<th><b>Size (min+gz)</b></th>
<th><b>Relative Speed (vs fastest)</b></th>
<th><b>Note</b></th>
</tr></thead><tbody>

<tr>
<td>Ajv</td>
<td>2,471,269</td>
<td>2.96%</td>
<td>78</td>
<td>~114 KB</td>
<td>🏆 1.00× (fastest)</td>
<td>Maximum throughput, heavier bundle</td>
</tr>

<tr>
<td>xvalidators</td>
<td>441,656</td>
<td>3.33%</td>
<td>79</td>
<td>~3.8 KB</td>
<td>~17.9% of Ajv</td>
<td>Small + fast for edge/API</td>
</tr>

<tr>
<td>Valibot</td>
<td>211,035</td>
<td>4.01%</td>
<td>78</td>
<td>~4 KB</td>
<td>~8.5% of Ajv</td>
<td>Small Size + Good Performance</td>
</tr>

<tr>
<td>Zod</td>
<td>196,603</td>
<td>5.89%</td>
<td>73</td>
<td>~25 KB</td>
<td>~7.9% of Ajv</td>
<td>Medium Size + Good Performance</td>
</tr>

<tr>
<td>Joi</td>
<td>36,377</td>
<td>8.34%</td>
<td>60</td>
<td>~80 KB</td>
<td>~1.5% of Ajv</td>
<td>Heavy Size + Slow Performance</td>
</tr>

<tr>
<td>Yup</td>
<td>21,757</td>
<td>9.05%</td>
<td>62</td>
<td>~28 KB</td>
<td>~0.88% of Ajv</td>
<td>Medium Size + Very Slow Performance</td>
</tr>

</tbody></table>

### 🧠 Key Insights
#### ✅ Ajv
- Top performer with ~2.47 million ops/sec. 
- Best for JSON Schema validation, high-throughput services. 
- Ideal for performance-critical Node.js or edge runtimes.
#### ✅ xvalidators
- ~5.6x slower than Ajv, but still 2.2x faster than Zod/Valibot. 
- Great tradeoff between performance and TypeScript-first development. 
- Especially useful for custom rules or logic-heavy apps (e.g., CMS, low-code platforms).
#### ⚖️ Zod vs. Valibot
- Nearly similar in ops/sec, suggesting similar architecture or design trade-offs.
- Good for TypeScript-first developer experience but noticeably slower than Ajv/xvalidators.
- Both offer great DX. 
- Valibot is leaner, Zod is richer in API and ecosystem.
#### ❌ Joi and Yup
- Significantly slower, not suited for performance-sensitive applications. 
- Useful for internal tools, legacy apps, or descriptive schemas where performance isn’t critical.

### 🏁 Final Thoughts
- If you need speed: → Ajv
- If you want TS + good speed: → xvalidators
- If you prefer a big community support over speed: → Zod or Valibot
- If you already use Formik or legacy stack: → Yup or Joi