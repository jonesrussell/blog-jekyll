---
title: Does my system support UEFI?
layout: post
categories: [linux]
tags: [ubuntu, boot-management]

---

```sh
sudo apt install efibootmgr -y \
	&& sudo efibootmgr
```

```sh
EFI variables are not supported on this system.
```

