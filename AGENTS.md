<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use Sora for headings and Manrope for body text with the light ocean-blue design tokens in `src/qr.css`, so every route retains one professional visual system.
- Keep the admin interface in shared dashboard modules with thin content routes and scoped styles; this prevents legacy site styling from affecting the admin workspace.
- Admin records are frontend demonstration data, not persisted account records; the current task requests a UI rather than a connected service.
