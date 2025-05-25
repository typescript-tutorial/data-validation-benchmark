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
<td>16,135,745.76</td>
<td>0.22%</td>
<td>98</td>
<td>~114 KB</td>
<td>🏆 1.00× (fastest)</td>
<td>Maximum throughput, heavier bundle</td>
</tr>

<tr>
<td>xvalidators</td>
<td>1,837,148.5</td>
<td>0.18%</td>
<td>98</td>
<td>~3.8 KB</td>
<td>~8.8× slower</td>
<td>Small + fast for edge/API</td>
</tr>

<tr>
<td>Zod</td>
<td>1,286,858.66</td>
<td>1.21%</td>
<td>97</td>
<td>~25 KB</td>
<td>~12.5× slower</td>
<td>Medium Size + Good Performance</td>
</tr>

<tr>
<td>Valibot</td>
<td>1,200,122.07</td>
<td>0.21%</td>
<td>98</td>
<td>~4 KB</td>
<td>~13.4× slower</td>
<td>Small Size + Good Performance</td>
</tr>

<tr>
<td>Joi</td>
<td>382,176.91</td>
<td>0.26%</td>
<td>98</td>
<td>~80 KB</td>
<td>~42.2× slower</td>
<td>Heavy Size + Slow Performance</td>
</tr>

<tr>
<td>Yup</td>
<td>139,092.61</td>
<td>0.25%</td>
<td>97</td>
<td>~28 KB</td>
<td>~116× slower</td>
<td>Medium Size + Very Slow Performance</td>
</tr>

</tbody></table>