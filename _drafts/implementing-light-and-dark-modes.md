# Implementing Light and Dark Modes with Modern CSS

Creating both light and dark modes for a website can seem daunting, but modern CSS simplifies the process.

This post covers how to use the `color-scheme` property, declare colors for both modes, and adjust color schemes using JavaScript and HTML.

## Default HTML Color Schemes

HTML provides two color schemes out of the box: black-on-white and white-on-black. These can be utilized to create a dark mode interface without extensive customization.

## Switching Color Schemes Automatically
To automatically switch between light and dark modes based on the user's OS preferences, use the `color-scheme` property:

```css
html {
  color-scheme: light dark;
}
```

Alternatively, you can use a `<meta>` tag in your HTML:

```html
<meta name="color-scheme" content="light dark">
```

## Declaring Colors for Both Modes

There are several methods to declare colors for both light and dark modes:

- **Declare Color Opacity**: Use opacity to allow the background color to shine through.
- **Use `color-mix()`**: Mix colors in CSS to achieve the desired effect.
- **Use `light-dark()`**: Provide complete control over colors for both modes.

## Adjusting Color Scheme with JavaScript

To allow users to switch between light and dark modes using JavaScript, manipulate the `color-scheme` property:

```javascript
const html = document.querySelector('html');

function switchMode(mode) {
  html.style.setProperty('color-scheme', mode === 'auto' ? 'light dark' : mode);
}
```

## Remembering User Preferences

To remember the user's color scheme preference, use the Web Storage API:

```javascript
localStorage.setItem('mode', 'dark');
const mode = localStorage.getItem('mode');
```

## Accessibility Considerations
Providing both light and dark modes enhances accessibility for users with different visual preferences. Ensure that contrast levels are appropriate and consider using the `prefers-contrast` media query for additional customization.

## Conclusion

Implementing light and dark modes is now easier with modern CSS. By using the `color-scheme` property, `color-mix()`, and `light-dark()`, you can create a seamless and accessible experience for all users.
