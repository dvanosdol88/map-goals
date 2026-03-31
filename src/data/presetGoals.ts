import { Goal, createGoal } from '@/modules/mapmaker/types';

export const PRESET_GOALS: Goal[] = [
    createGoal({ id: 'retire-early', name: 'Retire', icon: '🏖️' }),
    createGoal({ id: 'buy-home', name: 'Buy a Home', icon: '🏡' }),
    createGoal({ id: 'start-business', name: 'Start a Business', icon: '🚀' }),
    createGoal({ id: 'travel-world', name: 'Travel the World', icon: '✈️' }),
    createGoal({ id: 'pay-off-debt', name: 'Pay Off Debt', icon: '💳' }),
    createGoal({ id: 'save-education', name: 'Save for Education', icon: '🎓' }),
    createGoal({ id: 'build-emergency-fund', name: 'Build Emergency Fund', icon: '🛡️' }),
    createGoal({ id: 'buy-car', name: 'Buy a Car', icon: '🚗' }),
    createGoal({ id: 'wedding', name: 'Plan a Wedding', icon: '💒' }),
    createGoal({ id: 'home-renovation', name: 'Home Renovation', icon: '🔨' }),
    createGoal({ id: 'start-family', name: 'Start a Family', icon: '👶' }),
    createGoal({ id: 'investment-property', name: 'Buy Investment Property', icon: '🏢' }),
];
