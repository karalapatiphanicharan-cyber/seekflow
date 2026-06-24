import React from 'react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Card } from '../components/ui/Card';
import { Github, Mail, Bug, Lightbulb } from 'lucide-react';

const Contact: React.FC = () => {
  const contactMethods = [
    {
      icon: <Github className="text-primary" size={24} />,
      title: 'GitHub Repository',
      description: 'Report bugs, suggest features, or contribute to the codebase.',
      link: 'https://github.com/karalapatiphanicharan-cyber/seekflow',
      label: 'View Repository'
    },
    {
      icon: <Bug className="text-warning" size={24} />,
      title: 'Issue Tracker',
      description: 'Found a bug? Open an issue on GitHub and we\'ll look into it.',
      link: 'https://github.com/karalapatiphanicharan-cyber/seekflow/issues',
      label: 'Open Issue'
    },
    {
      icon: <Lightbulb className="text-secondary" size={24} />,
      title: 'Feature Requests',
      description: 'Have an idea to make SeekFlow better? We\'d love to hear it.',
      link: 'https://github.com/karalapatiphanicharan-cyber/seekflow/discussions',
      label: 'Suggest Feature'
    }
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-10 max-w-5xl mx-auto w-full">
      <SectionTitle subtitle="Get in Touch">Contact</SectionTitle>

      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <section className="space-y-4">
          <p className="text-lg text-text-secondary leading-relaxed">
            Have questions about SeekFlow or want to contribute to the project? We encourage
            open collaboration and feedback from the community.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <Card key={index} className="p-6 flex flex-col h-full border-border/40 hover:border-primary/30 transition-colors">
              <div className="mb-4">
                {method.icon}
              </div>
              <h3 className="font-bold text-text-primary mb-2">{method.title}</h3>
              <p className="text-sm text-text-secondary mb-6 flex-1">
                {method.description}
              </p>
              <a
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-surface border border-border text-xs font-mono uppercase tracking-wider text-text-primary hover:bg-primary/10 hover:border-primary/50 transition-all rounded-sm"
              >
                {method.label}
              </a>
            </Card>
          ))}
        </div>

        <Card className="p-8 border-dashed border-border/60 bg-transparent">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Mail className="text-primary" size={32} />
            </div>
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-xl font-bold text-text-primary">Collaborative Development</h3>
              <p className="text-text-secondary">
                SeekFlow is an open-source project. Whether you are a student looking to fix a bug
                or an educator wanting to add new algorithms, your contributions are welcome.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default Contact;
