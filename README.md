# Sieweck.de Landing Page

This repository contains a Nuxt-based static landing page for `sieweck.de`. The page acts as a simple hub that links to subdomains (e.g. personal sites) and is intended to be built as a static site.

The site is deployed via Netlify to `https://sieweck.netlify.app/`, and DNS records are configured so that `sieweck.de` points to that Netlify deployment.
This is why the Nuxt config uses the Nitro preset `netlify-static`.

## Development

Install dependencies and start the dev server:

```bash
pnpm install
pnpm dev
```

The site will be available at `http://localhost:3000`.

## Build

Generate the static site:

```bash
pnpm generate
```

Preview the production build locally:

```bash
pnpm preview
```

## Domain and DNS Setup

While this repository mostly contains the code for the website hosted under `sieweck.de`,
it also acts as documentation of the DNS, email and Cloudflare tunnel setup.

---

### 1. Domain Registrar

- **Registrar:** IONOS
- **Domain:** `sieweck.de`
- **Nameservers:** Managed via Cloudflare:
  - `dayana.ns.cloudflare.com`
  - `nitin.ns.cloudflare.com`
- All DNS resolution is handled via Cloudflare.

---

### 2. Web Hosting

- **Primary hosting provider:** Netlify, for both the root domain as well as a few subdomains.
- **Root domain:** `sieweck.de` → served from Netlify project `sieweck.netlify.app`
- **WWW domain:** `www.sieweck.de` → CNAME to `sieweck.netlify.app` (redirects automatically to root domain)

#### Subdomains deployed on Netlify

| Subdomain             | Netlify project                | Notes                            |
| --------------------- | ------------------------------ | -------------------------------- |
| `joerg.sieweck.de`    | `js-research.netlify.app`      | Main source of truth for `joerg` |
| `jörg.sieweck.de`     | Redirect to `joerg.sieweck.de` | Cloudflare page rule redirect    |
| `hendrik.sieweck.de`  | `smtz.netlify.app`             | Proxied through Cloudflare       |
| `hochzeit.sieweck.de` | `siewedding.netlify.app`       | Proxied through Cloudflare       |

---

### 3. Cloudflare Configuration

- **Purpose:**
  - DNS management for the domain and subdomains
  - Proxying traffic for Netlify sites
  - Cloudflare Tunnels for Home Assistant
  - Home Assistant Docker setup details in `https://github.com/drik98/home-assistant-configs`
  - Protection and caching for web traffic

- **DNS Records Overview:**

| Type  | Name            | Content/Target                     | Proxy Status |
| ----- | --------------- | ---------------------------------- | ------------ |
| A     | `@`             | `75.2.60.5` (Netlify root IP)      | Proxied      |
| CNAME | `www`           | `sieweck.netlify.app`              | Proxied      |
| CNAME | `joerg`         | `js-research.netlify.app`          | Proxied      |
| CNAME | `jörg`          | `joerg.sieweck.de`                 | Proxied      |
| CNAME | `hendrik`       | `smtz.netlify.app`                 | Proxied      |
| CNAME | `hochzeit`      | `siewedding.netlify.app`           | Proxied      |
| CNAME | `homeassistant` | Cloudflare tunnel                  | Proxied      |
| MX    | `@`             | `mx00.ionos.de`                    | DNS only     |
| MX    | `@`             | `mx01.ionos.de`                    | DNS only     |
| TXT   | `@`             | `v=spf1 include:spf.ionos.de ~all` | DNS only     |

- **Notes:**
  - Mail-related records (`MX` and `TXT/SPF`) must **not be proxied**.
  - Cloudflare Tunnel CNAME allows secure access to Home Assistant without exposing local ports.

---

### 4. Home Assistant Tunnel

- **Deployment:** Docker container using `cloudflare/cloudflared`
- **Container command:** `tunnel run`
- **Environment:** `TUNNEL_TOKEN` from Cloudflare Zero Trust
- **DNS:** `homeassistant.sieweck.de` → proxied via Cloudflare tunnel
- **Home Assistant trusted proxy config:**

```yaml
http:
  use_x_forwarded_for: true
  trusted_proxies:
    - 10.108.0.0/16 # Cloudflare internal tunnel network
```

- This allows secure external access to Home Assistant without exposing router ports.
- More details are documented in the Home Assistant Docker setup repo: https://github.com/drik98/home-assistant-configs

---

### 5. Email Setup

- **Provider:** IONOS
- **Receiving:** MX records point to IONOS (`mx00.ionos.de`, `mx01.ionos.de`)
- **Sending via Gmail:** SMTP configured for `smtp.ionos.de`, port 587, TLS
- **SPF:** TXT record authorizes IONOS servers:
  ```
  v=spf1 include:spf.ionos.de ~all
  ```
- **Optional:** DKIM and DMARC can be added for improved deliverability.

---

### 6. Notes & Best Practices

- **Root domain cannot be a CNAME** because MX/TXT records coexist; use A/ALIAS records for the apex domain.
- Cloudflare DNS is the **single source of truth**; any DNS changes at IONOS will not propagate unless NS are pointed back to IONOS.
- Any new subdomains or services (e.g., Immich at `photos.sieweck.de`) should be added in Cloudflare with appropriate CNAME or tunnel records.
- Always set **mail-related records as DNS only**; web traffic can remain proxied for caching/security.
- Use page rules or Cloudflare redirects for alias subdomains like `jörg.sieweck.de`.

---

### 7. Architecture Diagram

```
                    +-------------------+
                    |   Cloudflare NS   |
                    +-------------------+
                               |
       +-----------------------+-----------------------+
       |                       |                       |
       v                       v                       v
  +----------------+      +---------------+      +------------------+
  | sieweck        |      | homeassistant |      | Subdomains       |
  | .de root       |      | tunnel        |      | (joerg, hendrik, |
  | A → Netlify IP |      | CNAME proxied |      | hochzeit, etc.)  |
  +----------------+      +---------------+      +------------------+
       |
       v
 +---------------------+
 | Netlify Project     |
 | sieweck.netlify.app |
 +---------------------+
       |
       v
   Visitors (web)

  Email:
       sieweck.de MX → IONOS (mx00/mx01)
       SPF TXT → authorize IONOS SMTP
       Sending via Gmail uses IONOS SMTP
```

---

### 8. References

- [Netlify DNS documentation](https://docs.netlify.com/domains-https/custom-domains/)
- [Cloudflare DNS documentation](https://developers.cloudflare.com/dns/)
- [Cloudflare Tunnel / Zero Trust](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- [IONOS mail configuration](https://www.ionos.com/help/email/)
