import type { Dispatch, SetStateAction } from 'react';
import { Check, Flag } from 'lucide-react';
import type { CommunityVote } from '../types';

export default function Community({ id, s, tr }: {
  id: string;
  s: { votes: Record<string, CommunityVote>; setVotes: Dispatch<SetStateAction<Record<string, CommunityVote>>> };
  tr: (k: string) => string;
}) {
  const v: CommunityVote = s.votes[id] ?? { up: 2, down: 0, mine: null };
  function vote(dir: 'up' | 'down') {
    s.setVotes((prev) => {
      const cur: CommunityVote = prev[id] ?? { up: 2, down: 0, mine: null };
      if (cur.mine === dir) {
        return { ...prev, [id]: { up: cur.up - (dir === 'up' ? 1 : 0), down: cur.down - (dir === 'down' ? 1 : 0), mine: null } };
      }
      return {
        ...prev,
        [id]: {
          up: cur.up + (dir === 'up' ? 1 : 0) - (cur.mine === 'up' ? 1 : 0),
          down: cur.down + (dir === 'down' ? 1 : 0) - (cur.mine === 'down' ? 1 : 0),
          mine: dir,
        },
      };
    });
  }
  return (
    <div className="community">
      <p className="drawer-label">{tr('community.title')}</p>
      <div className="comm-row">
        <button className={`btn ghost sm ${v.mine === 'up' ? 'voted' : ''}`}
          onClick={() => vote('up')} aria-pressed={v.mine === 'up'}>
          <Check size={14} /> {tr('community.confirm')} ({v.up})
        </button>
        <button className={`btn ghost sm ${v.mine === 'down' ? 'voted' : ''}`}
          onClick={() => vote('down')} aria-pressed={v.mine === 'down'}>
          <Flag size={14} /> {tr('community.contest')} ({v.down})
        </button>
      </div>
      <p className="tiny dim">{tr('community.hint')}</p>
    </div>
  );
}
