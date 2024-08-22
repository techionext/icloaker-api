export type IpInfo = {
  ip_address: string;
  query_source: string;

  location: {
    city: string | null;
    region: string | null;
    country: string | null;
    continent: string | null;

    coordinates: {
      latitude: string | null;
      longitude: string | null;
    };

    time_zone: string | null;
    locale: string | null;
    country_code: string | null;
    region_code: string | null;
    continent_code: string | null;
    is_in_european_union: boolean;
  };

  network: {
    hostname: string | null;
    cidr_block: string | null;
    asn: string | null;
    isp: string | null;
  };

  bot_info: {
    is_bot: boolean;
    bot_name: string | null;
    detection_method: string | null;
  };
} | null;
