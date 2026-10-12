const iconSize: Record<string, [number, number]> = {
  "arrow-up-right": [16, 16],
  "arrow-up-right-white": [16, 16],
  "arrow-down": [18, 22],
  "arrow-right": [16, 16],
  check: [16, 16],
  "check-lg": [18, 18],
  "check-circle": [20, 20],
  "check-circle-muted": [18, 18],
  layers: [20, 20],
  "layers-blue": [20, 20],
  "workflow-white": [20, 20],
  workflow: [20, 20],
  box: [20, 20],
  search: [20, 20],
  "message-square": [20, 20],
  "corner-down-right": [16, 16],
  mail: [20, 20],
  "mail-muted": [18, 18],
  users: [20, 20],
  calendar: [20, 20],
  "calendar-muted": [18, 18],
  rocket: [20, 20],
  bot: [20, 20],
  globe: [20, 20],
  building: [20, 20],
  focus: [20, 20],
  "chart-bar": [20, 20],
  phone: [18, 18],
};

export function Icon({ name }: { name: string }) {
  const [width, height] = iconSize[name] ?? [20, 20];
  return <img className="icon" src={`/icons/${name}.svg`} width={width} height={height} alt="" />;
}
