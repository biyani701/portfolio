// glossaryData.js
// Data structure for glossary items

const glossaryData = [
  {
    id: "aav",
    acronym: "AAV",
    fullForm: "Account Authentication Value",
    details: "A security code used to authenticate card-not-present transactions, similar to CVV but dynamically generated.",
    category: "Payments",
    icon: "security" // Material UI icon name
  },
  {
    id: "otb",
    acronym: "OTB",
    fullForm: "Open To Buy",
    details: "The amount of credit available on a credit card account, calculated as the credit limit minus the current balance and any pending authorizations.",
    category: "Credit Cards",
    icon: "credit_card"
  },
  {
    id: "php",
    acronym: "PHP",
    fullForm: "Payment History Profile",
    details: "A record of a customer's payment behavior over time, used in credit scoring and risk assessment.",
    category: "Credit",
    icon: "history"
  },
  {
    id: "api",
    acronym: "API",
    fullForm: "Application Programming Interface",
    details: "A set of rules and protocols that allows different software applications to communicate with each other.",
    category: "Technology",
    icon: "code"
  },
  {
    id: "atm",
    acronym: "ATM",
    fullForm: "Automated Teller Machine",
    details: "An electronic banking outlet that allows customers to complete basic transactions without the aid of a branch representative or teller.",
    category: "Banking",
    icon: "local_atm"
  },
  {
    id: "bnpl",
    acronym: "BNPL",
    fullForm: "Buy Now, Pay Later",
    details: "A type of short-term financing that allows consumers to make purchases and pay for them at a future date, often interest-free.",
    category: "Payments",
    icon: "shopping_cart"
  },
  {
    id: "cdd",
    acronym: "CDD",
    fullForm: "Customer Due Diligence",
    details: "The process of identifying and verifying the identity of clients, assessing risks, and monitoring transactions to prevent financial crimes.",
    category: "Compliance",
    icon: "verified_user"
  },
  {
    id: "emv",
    acronym: "EMV",
    fullForm: "Europay, Mastercard, and Visa",
    details: "A global standard for credit and debit payment cards based on chip card technology, designed to reduce fraud.",
    category: "Payments",
    icon: "credit_score"
  },
  {
    id: "kyc",
    acronym: "KYC",
    fullForm: "Know Your Customer",
    details: "The process of verifying the identity of clients and assessing potential risks of illegal intentions in business relationships.",
    category: "Compliance",
    icon: "person_search"
  },
  {
    id: "pos",
    acronym: "POS",
    fullForm: "Point of Sale",
    details: "The place where a customer executes the payment for goods or services and where sales taxes may become payable.",
    category: "Payments",
    icon: "point_of_sale"
  },
  {
    id: "rtp",
    acronym: "RTP",
    fullForm: "Real-Time Payments",
    details: "A payment system that allows for the immediate transfer of funds between accounts at different financial institutions.",
    category: "Payments",
    icon: "bolt"
  },
  {
    id: "sepa",
    acronym: "SEPA",
    fullForm: "Single Euro Payments Area",
    details: "A payment integration initiative of the European Union for simplification of bank transfers denominated in euro.",
    category: "Payments",
    icon: "euro"
  }
];

export default glossaryData;
