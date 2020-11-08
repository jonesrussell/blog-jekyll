---
title: "How to Manage DNS Settings in Linux"
layout: post
categories: [linux, dns]
tags: [services, devops, domains]

---

It's been a few years since I've manually configured **DNS servers**, or have thought about DNS at all. Today my Ubuntu 18.04 server could ping IP addresses on the Internet, but it could not resolve domain names so I had to investigate.

In Linux there's a simple plain-text configuration file, /etc/resolv.conf, which the *DNS resolver* uses to operate.

## Master, sir, I heard Yoda talking about DNS. I’ve been wondering, what is DNS?

Sorry, that's a terrible *Star Wars* mis-quote. Back to the lecture at hand.

<blockquote cite="https://tinydns.org/"><p>The DNS resolver allows applications running in the operating system to translate human-friendly domain names into the numeric IP addresses that are required for access to resources on the local area network or the Internet. The process of determining IP addresses from domain names is called *resolving*.</p><footer>-- <cite>TinyDNS.org</cite></footer></blockquote>

In other words, when you click a link on Google's SERP (Search Engine Results Page) the DNS resolver on your device will translate the address into an IP address. eg) www.twitter.com translates to 104.244.42.1.

Check DNS upstream:

```bash
systemd-resolve --status
```

Example output:

```output
Global
          DNSSEC NTA: 10.in-addr.arpa
                      16.172.in-addr.arpa
                      168.192.in-addr.arpa
                      17.172.in-addr.arpa
                      18.172.in-addr.arpa
                      19.172.in-addr.arpa
                      20.172.in-addr.arpa
                      21.172.in-addr.arpa
                      22.172.in-addr.arpa
                      23.172.in-addr.arpa
                      24.172.in-addr.arpa
                      25.172.in-addr.arpa
                      26.172.in-addr.arpa
                      27.172.in-addr.arpa
                      28.172.in-addr.arpa
                      29.172.in-addr.arpa
                      30.172.in-addr.arpa
                      31.172.in-addr.arpa
                      corp
                      d.f.ip6.arpa
                      home
                      internal
                      intranet
                      lan
                      local
                      private
                      test

Link 24 (vethdc3e290)
      Current Scopes: none
       LLMNR setting: yes
MulticastDNS setting: no
      DNSSEC setting: no
    DNSSEC supported: no

Link 20 (veth29b3520)
      Current Scopes: none
       LLMNR setting: yes
MulticastDNS setting: no
      DNSSEC setting: no
    DNSSEC supported: no

Link 18 (veth8bef062)
      Current Scopes: none
       LLMNR setting: yes
MulticastDNS setting: no
      DNSSEC setting: no
    DNSSEC supported: no

Link 16 (veth94a1964)
      Current Scopes: none
       LLMNR setting: yes
MulticastDNS setting: no
      DNSSEC setting: no
    DNSSEC supported: no

Link 14 (vethbe8751f)
      Current Scopes: none
       LLMNR setting: yes
MulticastDNS setting: no
      DNSSEC setting: no
    DNSSEC supported: no

Link 12 (vethf8623ac)
      Current Scopes: none
       LLMNR setting: yes
MulticastDNS setting: no
      DNSSEC setting: no
    DNSSEC supported: no

Link 10 (veth06a90ea)
      Current Scopes: none
       LLMNR setting: yes
MulticastDNS setting: no
      DNSSEC setting: no
    DNSSEC supported: no

Link 8 (docker0)
      Current Scopes: none
       LLMNR setting: yes
MulticastDNS setting: no
      DNSSEC setting: no
    DNSSEC supported: no

Link 7 (br-0df09d016251)
      Current Scopes: none
       LLMNR setting: yes
MulticastDNS setting: no
      DNSSEC setting: no
    DNSSEC supported: no

Link 6 (virbr1-nic)
      Current Scopes: none
       LLMNR setting: yes
MulticastDNS setting: no
      DNSSEC setting: no
    DNSSEC supported: no

Link 5 (virbr1)
      Current Scopes: none
       LLMNR setting: yes
MulticastDNS setting: no
      DNSSEC setting: no
    DNSSEC supported: no

Link 4 (virbr0-nic)
      Current Scopes: none
       LLMNR setting: yes
MulticastDNS setting: no
      DNSSEC setting: no
    DNSSEC supported: no

Link 3 (virbr0)
      Current Scopes: none
       LLMNR setting: yes
MulticastDNS setting: no
      DNSSEC setting: no
    DNSSEC supported: no

Link 2 (enp2s0)
      Current Scopes: DNS
       LLMNR setting: yes
MulticastDNS setting: no
      DNSSEC setting: no
    DNSSEC supported: no
         DNS Servers: 192.168.42.1
          DNS Domain: ~.
                      galaxy.lan
```

## Common DNS servers

- bind9
- mDNS
- tinydns

## Available DNS Servers For Use

- Open DNS
- Google Public DNS
- Comodo Secure DNS
- Level3 DNS
- Norton Connect Safe
- DNS.Watch


