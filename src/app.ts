import Ajv, { JSONSchemaType } from "ajv"
import addFormats from "ajv-formats"
import Benchmark from "benchmark"
import Joi from "joi"
import { number as sNumber, object as sObject, string as sString } from "superstruct"
import { email, maxValue, minValue, number, object, parse, pipe, string } from "valibot"
import { Attributes, StringMap, validate } from "xvalidators"
import * as yup from "yup"
import { z as zod } from "zod"

interface Resources {
  [key: string]: StringMap
}

const enResource: StringMap = {
  error_undefined: "{0} is not allowed to exist.",
  error_exp: "{0} does not match the regular expression.",
  error_type: "Invalid datatype. Type of {0} cannot be {1}.",

  error_required: "{0} is required.",
  error_minlength: "{0} cannot be less than {1} characters.",
  error_maxlength: "{0} cannot be greater than {1} characters.",

  error_email: "{0} is not a valid email address.",
  error_integer: "{0} is not a valid integer.",
  error_number: "{0} is not a valid number.",
  error_precision: "{0} has a valid precision. Precision must be less than or equal to {1}",
  error_scale: "{0} has a valid scale. Scale must be less than or equal to {1}",
  error_phone: "{0} is not a valid phone number.",
  error_fax: "{0} is not a valid fax number.",
  error_url: "{0} is not a valid URL.",
  error_ipv4: "{0} is not a valid ipv4.",
  error_ipv6: "{0} is not a valid ipv6.",

  error_min: "{0} must be greater than or equal to {1}.",
  error_max: "{0} must be less than or equal to {1}.",
  error_date: "{0} is not a valid date.",
  error_enum: "{0} must be one of {1}.",

  username: "Username",
  date_of_birth: "Date Of Birth",
  telephone: "Telephone",
  email: "Email",
  website: "Website",
  status: "User Status",
  credit_limit: "Credit Limit",
}

const viResource = {
  error_undefined: "{0} không được phép tồn tại.",
  error_exp: "{0} không khớp với biểu thức chính quy.",
  error_type: "Kiểu dữ liệu không hợp lệ. Kiểu của {0} không thể là {1}.",

  error_required: "{0} là bắt buộc.",
  error_minlength: "{0} không được ít hơn {1} ký tự.",
  error_maxlength: "{0} không được nhiều hơn {1} ký tự.",

  error_email: "{0} không phải là địa chỉ email hợp lệ.",
  error_integer: "{0} không phải là số nguyên hợp lệ.",
  error_number: "{0} không phải là số hợp lệ.",
  error_precision: "{0} có độ chính xác không hợp lệ. Độ chính xác phải nhỏ hơn hoặc bằng {1}.",
  error_scale: "{0} có thang đo không hợp lệ. Thang đo phải nhỏ hơn hoặc bằng {1}.",
  error_phone: "{0} không phải là số điện thoại hợp lệ.",
  error_fax: "{0} không phải là số fax hợp lệ.",
  error_url: "{0} không phải là URL hợp lệ.",
  error_ipv4: "{0} không phải là địa chỉ IPv4 hợp lệ.",
  error_ipv6: "{0} không phải là địa chỉ IPv6 hợp lệ.",

  error_min: "{0} phải lớn hơn hoặc bằng {1}.",
  error_max: "{0} phải nhỏ hơn hoặc bằng {1}.",
  error_date: "{0} không phải là ngày hợp lệ.",
  error_enum: "{0} phải là một trong các giá trị sau: {1}.",

  username: "Tên người dùng",
  date_of_birth: "Ngày sinh",
  telephone: "Điện thoại",
  email: "Địa chỉ email",
  website: "Trang web",
  status: "Trạng thái người dùng",
  credit_limit: "Hạn mức tín dụng",
}

const resources: Resources = {
  en: enResource,
  vi: viResource,
}

function getResource(lang: string): StringMap {
  return resources[lang] || resources["en"]
}
const resource = getResource("en") // or "vi" for Vietnamese

// Sample data
const data = {
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
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
  required: ["name", "age", "email", "address"],
  additionalProperties: false,
}

const ajv = new Ajv()
addFormats(ajv)
const ajvValidate = ajv.compile(ajvSchema)

const userSchema: Attributes = {
  name: { required: true },
  age: { type: "number", required: true, min: 1, max: 100 },
  email: { required: true, format: "email", resource: "email" },
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

const valibotSchema = object({
  name: string(),
  age: pipe(number(), minValue(1), maxValue(100)),
  email: pipe(string(), email()), // Valibot doesn't have built-in email validator
  address: object({
    street: string(),
    city: string(),
    zip: string(),
  }),
})

// Zod schema
const zodSchema = zod.object({
  name: zod.string(),
  age: zod.number().min(1).max(100),
  email: zod.string().email(),
  address: zod.object({
    street: zod.string(),
    city: zod.string(),
    zip: zod.string(),
  }),
})

// Joi schema
const joiSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required().min(1).max(100),
  email: Joi.string().email().required(),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    zip: Joi.string().required(),
  }).required(),
})

const yupSchema = yup.object({
  name: yup.string().required(),
  age: yup.number().required().min(1).max(100),
  email: yup.string().required(),
  address: yup
    .object({
      street: yup.string().required(),
      city: yup.string().required(),
      zip: yup.string().required(),
    })
    .required(),
})

const superstructSchema = sObject({
  name: sString(),
  age: sNumber(),
  email: sString(),
  address: sObject({
    street: sString(),
    city: sString(),
    zip: sString(),
  }),
})

// ────────────────────────────────────────────────────────────
// Warm-up phase: Give V8 time to JIT optimize the functions
// ────────────────────────────────────────────────────────────
function warmUp(fn: () => void, name: string) {
  for (let i = 0; i < 10000; i++) fn()
  console.log(`Warm-up complete: ${name}`)
}

warmUp(() => ajvValidate(data), "Ajv")
warmUp(() => validate(data, userSchema, resource, true), "xvalidators")
warmUp(() => parse(valibotSchema, data), "Valibot")
warmUp(() => zodSchema.parse(data), "Zod")
warmUp(() => joiSchema.validate(data), "Joi")
warmUp(() => yupSchema.validate(data), "Yup")
warmUp(() => superstructSchema.create(data), "Superstruct")

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
    validate(data, userSchema, resource, true)
  })
  .add("Valibot", () => {
    parse(valibotSchema, data)
  })
  .add("Zod", () => {
    zodSchema.parse(data)
  })
  .add("Joi", () => {
    joiSchema.validate(data)
  })
  .add("Yup", () => {
    yupSchema.validate(data).then((valid) => {})
  })
  .add("Superstruct", () => {
    superstructSchema.create(data)
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
