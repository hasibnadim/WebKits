# WebKits

A curated collection of free online tools for developers and creators. No signup required, no data collected — just fast, reliable utilities.

## Tools

- **Text Sharing** — Share text snippets with a link that expires in 30 days
- **File Sharing** — Upload and share files with automatic expiration
- **QR Code Generator** — Create custom QR codes with styling options
- **Mobile Banking** — Calculate mobile banking transaction fees (bKash, Nagad, etc.)
- **Byte Converter** — Convert between data units (bytes, KB, MB, GB, etc.)
- **String/JSON Size Calculator** — Calculate the byte size of strings and JSON objects
- **Text Diff Checker** — Compare two texts side by side with highlighted differences
- **Random Key Generator** — Generate secure random keys and passwords

## Tech Stack

- **Next.js 16** with App Router and Turbopack
- **React 19** with TypeScript
- **Tailwind CSS 4** with Radix UI components
- **MongoDB** for data persistence 

## Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

## Environment

Copy `.example-env` to `.env` and configure:

```
MONGODB_URI=your_mongodb_connection_string
```

## Project Structure

```
src/
├── app/
│   ├── about/           # About page
│   ├── kit/             # Tool kit pages
│   │   └── (applications)/
│   ├── t/               # Shared text/file view pages
│   └── page.tsx         # Home page
├── components/
│   ├── ui/              # Base UI components (shadcn/ui)
│   └── KitLayout.tsx    # Shared kit page layout
└── services/
    └── mongodb.ts       # Database service
```

## License

MIT &copy; 2026 Eng. Md. Hasib Nadim
