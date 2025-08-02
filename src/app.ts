import Ajv, { JSONSchemaType } from "ajv"
import addFormats from "ajv-formats"
import Benchmark from "benchmark"
import Joi from "joi"
import { email, literal, maxValue, minValue, number, object, parse, pipe, string, union, url } from "valibot"
import { Attributes, validate } from "xvalidators"
import * as yup from "yup"
import { z } from "zod"

// Sample data
const data = {
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
  url: "https://example.com",
  status: "D",
  address: {
    street: "123 Main St",
    city: "New York",
    zip: "10001",
  },
}

// TypeScript type
interface User {
  name: string
  age: number
  email: string
  url: string
  status: string
  address: {
    street: string
    city: string
    zip: string
  }
}

// Ajv schema
const ajvSchema: JSONSchemaType<User> = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number", minimum: 1, maximum: 100 },
    email: { type: "string", format: "email" },
    url: { type: "string", format: "uri" },
    status: { type: "string", enum: ["A", "I", "D", "N"] },
    address: {
      type: "object",
      properties: {
        street: { type: "string" },
        city: { type: "string" },
        zip: { type: "string" },
      },
      required: ["street", "city", "zip"],
    },
  },
  required: ["name", "age", "email", "url", "address"],
  additionalProperties: false,
}

const ajv = new Ajv()
addFormats(ajv)
const ajvValidate = ajv.compile(ajvSchema)

const userSchema: Attributes = {
  name: { required: true },
  age: { type: "number", required: true, min: 1, max: 100 },
  email: { required: true, format: "email", resource: "email" },
  url: { required: true, format: "url", resource: "url" },
  status: { required: true, enum: ["A", "I", "D", "N"] },
  address: {
    type: "object",
    required: true,
    typeof: {
      street: { required: true },
      city: { required: true },
      zip: { required: true, resource: "zip" },
    },
  },
}

// Zod schema
const zodSchema = z.object({
  name: z.string(),
  age: z.number().min(1).max(100),
  email: z.string().email(),
  url: z.string().url(),
  status: z.enum(["A", "I", "D", "N"]),
  address: z.object({
    street: z.string(),
    city: z.string(),
    zip: z.string(),
  }),
})

const valibotSchema = object({
  name: string(),
  age: pipe(number(), minValue(1), maxValue(100)),
  email: pipe(string(), email()), // Valibot doesn't have built-in email validator
  url: pipe(string(), url()),
  status: union([literal("A"), literal("I"), literal("D"), literal("N")]),
  address: object({
    street: string(),
    city: string(),
    zip: string(),
  }),
})

// Joi schema
const joiSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required().min(1).max(100),
  email: Joi.string().required().email(),
  url: Joi.string().required().uri(),
  status: Joi.string().valid("A", "I", "D", "N").required(),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    zip: Joi.string().required(),
  }).required(),
})

const yupSchema = yup.object({
  name: yup.string().required(),
  age: yup.number().required().min(1).max(100),
  email: yup.string().required().email(),
  url: yup.string().required().url(),
  status: yup.mixed<"A" | "I" | "D" | "N">().oneOf(["A", "I", "D", "N"]).required(),
  address: yup
    .object({
      street: yup.string().required(),
      city: yup.string().required(),
      zip: yup.string().required(),
    })
    .required(),
})

// ────────────────────────────────────────────────────────────
// Warm-up phase: Give V8 time to JIT optimize the functions
// ────────────────────────────────────────────────────────────
function warmUp(fn: () => void, name: string) {
  for (let i = 0; i < 10000; i++) fn()
  console.log(`Warm-up complete: ${name}`)
}

warmUp(() => ajvValidate(data), "Ajv")
warmUp(() => validate(data, userSchema, undefined, true), "xvalidators")
warmUp(() => parse(valibotSchema, data), "Valibot")
warmUp(() => zodSchema.parse(data), "Zod")
warmUp(() => joiSchema.validate(data), "Joi")
warmUp(() => yupSchema.validate(data), "Yup")

// Benchmark setup
const suite = new Benchmark.Suite()
const results: {
  Library: string
  "Ops/sec": string
  "RME (%)": string
  Samples: number
}[] = []

suite
  .add("Ajv", () => {
    ajvValidate(data)
  })
  .add("xvalidators", () => {
    validate(data, userSchema, undefined, true)
  })
  .add("Zod", () => {
    zodSchema.parse(data)
  })
  .add("Valibot", () => {
    parse(valibotSchema, data)
  })
  .add("Joi", () => {
    joiSchema.validate(data)
  })
  .add("Yup", () => {
    yupSchema.validate(data).then((valid) => {})
  })
  .on("cycle", (event: any) => {
    const bench = event.target
    results.push({
      Library: bench.name,
      "Ops/sec": bench.hz.toFixed(2),
      "RME (%)": bench.stats.rme.toFixed(2),
      Samples: bench.stats.sample.length,
    })
  })
  .on("complete", function (this: Benchmark.Suite) {
    console.log("\n📊 Benchmark Report Table:\n")
    console.table(results)
    console.log("🏆 Fastest is →", this.filter("fastest").map("name"))
  })
  .run({ async: true })
