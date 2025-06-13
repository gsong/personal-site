# Deploy

1. Check out `main` branch and make sure it's up to date with remote
   ```bash
   git checkout main
   git pull origin main
   ```

2. Fast forward merge current branch into `main`
   ```bash
   git merge --ff-only <current-branch>
   ```

3. Push `main` to remote using force-with-lease for safety
   ```bash
   git push --force-with-lease origin main
   ```

4. Create a tag with the format `yyyy/mm/dd-{letter}` where:
   - The date is today's date
   - The letter starts with `a` for the first deploy of the day
   - Subsequent deploys increment the letter (b, c, d, etc.)
   - Example: First deploy on June 3, 2025 would be `2025/06/03-a`
   - Second deploy same day would be `2025/06/03-b`
   ```bash
   git tag 2025/06/13-a
   ```

5. Push the tag to the remote repository
   ```bash
   git push origin 2025/06/13-a
   ```

Use these git commands to accomplish the deployment process. Always check for existing tags on the same date to determine the correct letter suffix.
