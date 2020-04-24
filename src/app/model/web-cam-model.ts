export interface WebCamModel 
{
  status: string,
  result: {
    offset: number,
    limit: number,
    total: number,
    webcams: WebCamItemModel[]
  }
}

export interface WebCamItemModel 
{
  id: string,
  status: string,
  title: string,
  image: {
    current: {
      icon: string,
      thumbnail: string,
      preview: string,
      toenail: string
    },
    daylight: {
      icon: string,
      thumbnail: string,
      preview: string,
      toenail: string
    },
    sizes: {
      icon: {
        width: number,
        height: number
      },
      thumbnail: {
        width: number,
        height: number
      },
      preview: {
        width: number,
        height: number
      },
      toenail: {
        width: number,
        height: number
      }
    },
    update: number
  },
  location: {
    city: string,
    region: string,
    region_code: string,
    country: string,
    country_code: string,
    continent: string,
    continent_code: string,
    latitude: number,
    longitude: number,
    timezone: string
  },
  player: {
    live: {
      available: boolean,
      embed: string
    },
    day: {
      available: boolean,
      link: string,
      embed: string
    },
    month: {
      available: boolean,
      link: string,
      embed: string
    },
    year: {
      available: boolean,
      link: string,
      embed: string
    },
    lifetime: {
      available: boolean,
      link: string,
      embed: string
    }
  }
}