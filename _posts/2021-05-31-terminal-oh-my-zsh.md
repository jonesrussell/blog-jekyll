title: My Up-Arrow key is fried :( How to cope...
layout: post
categories: [terminal]
tags: [shortcuts, alternatives]

---

To my dismay (and klutziness), I spilled a glass of water onto my laptop keyboard.

I powered it down (upside down), cleaned it up and dried it out.

To my relief, despite some initial crackling noises, the laptop is fine *except* my Up-Arrow key is now non-functional :(.

Until I replace the keyboard, I now have to compensate for how much I do use the Up-Arrow, which is plenty.

## Terminal (ZSH w/Oh-My-Zsh)

I spend most of my time in a terminal where the Up-Arrow is incredibly useful to backtrack over your command history. Here's one way I cope:

```sh
$ !! <Enter>
$ git push
```

In that example, `git push` was the last command I wrote.

Let's say I want to execute my last `scp` command:

```
$ !scp <Enter>
$ scp -r server:/mnt/media/movies/The\\\ Lord\\\ of\\\ the\\\ Rings\\\ The\\\ Fellowship\\\ of\\\ the\\\ Ring .
```

Fun fact, yesterday a local-ish power outage had my Internet connection down. I decided to move a few movies over to my laptop that were each ~4 hours in just in case.

## vim

When in the default Command-mode (as opposed to Insert-mode), to scroll up line-by-line I now have to use `k` which will scroll up one line at a time.

## Why this post?

I suppose I want to illustrate that there's usually a way to work around issues, never give up!

## References

* [oh-my-zsh](https://ohmyz.sh/)
* [vim cheatsheet](https://devhints.io/vim)

