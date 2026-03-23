import * as p from '@clack/prompts';
import pc from 'picocolors';
import logSymbols from 'log-symbols';

async function main() {
  console.clear();
  
  // A beautiful, color-coded intro
  p.intro(`${pc.bgCyan(pc.black(' EXPRESS GENERATOR '))} ${pc.dim('v1.0.0')}`);

  const project = await p.group(
    {
      name: () => 
        p.text({
          message: 'What is your project named?',
          placeholder: 'my-express-api',
          validate: (value) => {
            if (!value) return 'Project name is required';
            if (value.includes(' ')) return 'Spaces are not allowed in project names';
          },
        }),
      
      language: () =>
        p.select({
          message: 'Pick your preferred language',
          initialValue: 'ts',
          options: [
            { 
                value: 'ts', 
                label: pc.blue('TypeScript'), 
                hint: pc.italic(pc.dim('Recommended: Adds type safety & better DX')) 
            },
            { 
                value: 'js', 
                label: pc.yellow('JavaScript'), 
                hint: pc.dim('Standard: Use for quick prototyping') 
            },
          ],
        }),

      db: () =>
        p.select({
          message: 'Which database will you use?',
          options: [
            { value: 'mongodb', label: 'MongoDB', hint: 'via Mongoose' },
            { value: 'postgresql', label: 'PostgreSQL', hint: 'via Prisma' },
            { value: 'none', label: 'None', hint: 'I will handle it later' },
          ],
        }),

      install: () =>
        p.confirm({
          message: `Install dependencies now using ${pc.magenta('npm')}?`,
          initialValue: true,
        }),
    },
    {
      onCancel: () => {
        p.cancel(pc.red('Setup cancelled. See you next time!'));
        process.exit(0);
      },
    }
  );

  // Logic display based on their choice
  const langLabel = project.language === 'ts' ? pc.blue('TypeScript') : pc.yellow('JavaScript');
  
  const s = p.spinner();
  s.start(`Scaffolding ${langLabel} project structure...`);
  
  // Simulate folder creation and dependency installation
  await new Promise((resolve) => setTimeout(resolve, 2500));
  
  s.stop(`${logSymbols.success} Project ${pc.cyan(project.name)} is ready!`);

  // Final summary box
  p.note(
    `Language: ${langLabel}\nDatabase: ${pc.magenta(project.db)}\nInstall: ${project.install ? 'Yes' : 'No'}`,
    'Configuration Summary'
  );

  p.outro(`Next steps:
  ${pc.cyan(`cd ${project.name}`)}
  ${project.install ? pc.cyan('npm run dev') : pc.cyan('npm install && npm run dev')}
  
  ${pc.green('Happy coding! 🚀')}`);
}

main().catch((err) => {
  p.cancel(pc.red(`An error occurred: ${err.message}`));
  process.exit(1);
});
