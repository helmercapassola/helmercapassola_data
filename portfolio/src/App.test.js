import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ public_repos: 59 }),
  });
});

test('renders the English data portfolio and its main sections', async () => {
  render(<App />);

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Data Engineer & Analyst');
  expect(screen.getByText('Data Engineering • Analytics • BI')).toBeInTheDocument();
  expect(screen.getByText('Transforming Data Into Insights')).toBeInTheDocument();
  expect(document.querySelector('.hero-data-bubbles')).toHaveAttribute('aria-hidden', 'true');
  expect(document.querySelectorAll('.hero-bubble-wire')).toHaveLength(7);
  expect(document.querySelectorAll('.hero-floating-bubble')).toHaveLength(8);
  expect(document.querySelector('.professional-data-art')).toHaveAttribute('aria-hidden', 'true');
  expect(document.querySelector('.toolkit-data-art')).toHaveAttribute('aria-hidden', 'true');
  expect(document.querySelector('.floating-data-svg')).toHaveAttribute('aria-hidden', 'true');
  expect(screen.getByRole('img', { name: /Animated data pipeline/ })).toBeInTheDocument();
  expect(document.querySelectorAll('.data-flow-node')).toHaveLength(5);
  expect(document.querySelectorAll('.data-flow-path')).toHaveLength(4);
  expect(document.querySelectorAll('.data-flow-packets animateMotion')).toHaveLength(8);
  expect([...document.querySelectorAll('.data-flow-packets animateMotion')].map((motion) => motion.getAttribute('path')))
    .toContain('M307 196V304');
  expect(document.querySelector('.data-node-transform')).toBeInTheDocument();
  expect(document.querySelector('.professional-data-art')).toHaveAttribute('aria-hidden', 'true');
  expect(document.querySelectorAll('.toolkit-chart-packets animateMotion')).toHaveLength(3);
  expect(document.querySelectorAll('.project-card .visual-line')).toHaveLength(8);
  expect(screen.queryByText(/DATA FLOW \/ 001/)).not.toBeInTheDocument();
  expect(screen.queryByText('Luanda, Angola')).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Reliable data.*Real-world impact/ })).toBeInTheDocument();
  expect(screen.getByText(/more than five years of experience designing and implementing data pipelines/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Mobile Application Development' })).toBeInTheDocument();
  expect(screen.getByText(/Development of a Mobile Application for Personal and Professional Guidance/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Computer Engineering' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Licenses & Certifications/ })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Docker Accelerated Container' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Big Data & Analytics' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Fundamentals of Data Engineering' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'NLW Pocket: Mobile — Kotlin' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Projects that move data forward/ })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /A practical data toolkit/ })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Delivery & Collaboration/ })).toBeInTheDocument();
  expect(screen.getByText('Agile / Scrum')).toBeInTheDocument();
  expect(screen.getByText('Sprint Planning')).toBeInTheDocument();
  expect(screen.getByText('Jira')).toBeInTheDocument();
  expect(screen.getByText('Confluence')).toBeInTheDocument();
  expect(screen.getByText('Stakeholder Management')).toBeInTheDocument();
  expect(screen.getByText('Technical Mentoring')).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /View repository/ })).toHaveLength(4);
  expect(screen.getByRole('link', { name: /helmercap@gmail\.com/i })).toHaveAttribute(
    'href',
    'mailto:helmercap@gmail.com'
  );
  expect(await screen.findByText('59')).toBeInTheDocument();
});

test('shows the public repository count returned by the GitHub API', async () => {
  render(<App />);

  expect(await screen.findByText('59')).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.github.com/users/helmercapassola',
    expect.objectContaining({ headers: { Accept: 'application/vnd.github+json' } })
  );
});

test('shows a clear message when the GitHub API is unavailable', async () => {
  global.fetch.mockRejectedValue(new Error('Network unavailable'));
  render(<App />);

  expect(await screen.findByText(/Count unavailable · View GitHub/)).toBeInTheDocument();
});

test('does not render profile images', async () => {
  const { container } = render(<App />);

  expect(container.querySelector('img')).not.toBeInTheDocument();
  expect(await screen.findByText('59')).toBeInTheDocument();
});
