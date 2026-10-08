// WPGraphQL queries. Field and group names must match the ACF setup in
// docs/wordpress/setup.md (ACF snake_case → GraphQL camelCase via WPGraphQL for ACF).

const IMAGE = /* GraphQL */ `
  fragment Img on MediaItem { sourceUrl altText mediaDetails { width height } }
`;

export const SETTINGS = /* GraphQL */ `
  ${IMAGE}
  query Settings {
    siteSettings {
      siteSettingsFields {
        orgName acronym statusLine address phoneDisplay phoneE164 whatsappE164 email
        socials { network url }
        logoFull { node { ...Img } }
        logoFullLight { node { ...Img } }
        logoCompact { node { ...Img } }
        logoMark { node { ...Img } }
        ctaJoinLabel ctaPartnerLabel ctaContactLabel
        launchBanner { enabled text link }
      }
    }
  }
`;

export const HOME = /* GraphQL */ `
  query Home($asPreview: Boolean) {
    page(id: "home", idType: URI, asPreview: $asPreview) {
      homeFields {
        heroEyebrow heroTitle heroHighlight heroLead
        stats { value label }
        whoWeAre vision mission
        objectives { title body }
        featuredPeople { nodes { slug } }
        gapTitle gapHighlight gapSupportedSectors { name }
        familyTitle familyHighlight familyLead
        familyAssociations { slug name crop since facts { text } partner { nodes { slug } } isSelf }
        reachTitle reachHighlight
      }
    }
  }
`;

export const ABOUT = /* GraphQL */ `
  query About($asPreview: Boolean) {
    page(id: "about", idType: URI, asPreview: $asPreview) {
      aboutFields { establishedYear history coverage structureIntro }
    }
  }
`;

export const MEMBERSHIP = /* GraphQL */ `
  query Membership($asPreview: Boolean) {
    page(id: "membership", idType: URI, asPreview: $asPreview) {
      membershipFields {
        eligibility
        categories { name summary }
        benefits { title }
        benefitsConfirmed feeStatement
        steps { title body }
        memberIdTurnaround enquiriesEmail
      }
    }
  }
`;

export const PEOPLE = /* GraphQL */ `
  ${IMAGE}
  query People {
    people(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        slug title
        personGroups { nodes { slug } }
        personFields { boardRole managementRole regionalRole region headshot { node { ...Img } } }
      }
    }
  }
`;

export const PARTNERS = /* GraphQL */ `
  ${IMAGE}
  query Partners {
    partners(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        slug title
        partnerTypes { nodes { slug } }
        partnerFields { shortName description logoIsGreyscale website consentConfirmed logo { node { ...Img } } }
      }
    }
  }
`;

export const VARIETIES = /* GraphQL */ `
  ${IMAGE}
  query Varieties {
    varieties(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes { slug title varietyFields { code summary isMinor attributes { label } image { node { ...Img } } } }
    }
  }
`;

export const EVENTS = /* GraphQL */ `
  query Events {
    events(first: 50) {
      nodes { slug title eventFields { monthLabel startDate dateTbc venue venueTbc summary } }
    }
  }
`;

export const POSTS = /* GraphQL */ `
  query Posts($first: Int = 20) {
    posts(first: $first, where: { status: PUBLISH }) {
      nodes { slug title date excerpt }
    }
  }
`;

export const LEGAL = /* GraphQL */ `
  query Legal {
    pages(first: 10, where: { nameIn: ["privacy", "cookies", "terms"] }) {
      nodes { slug title modified content }
    }
  }
`;
