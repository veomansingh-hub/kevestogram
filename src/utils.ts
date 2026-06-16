export function formatPhoneNumber(value: string): string {
  const hasPlus = value.startsWith('+');
  const digits = value.replace(/\D/g, '');
  
  if (digits.length === 0) {
    return hasPlus ? '+' : '';
  }

  // Format Belarus (+375) or Russia (+7) or general
  if (digits.startsWith('375')) {
    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 5);
    const part3 = digits.slice(5, 8);
    const part4 = digits.slice(8, 10);
    const part5 = digits.slice(10, 12);
    
    let res = `+${part1}`;
    if (part2) res += ` (${part2})`;
    if (part3) res += ` ${part3}`;
    if (part4) res += `-${part4}`;
    if (part5) res += `-${part5}`;
    return res;
  } else if (digits.startsWith('7')) {
    const part1 = digits.slice(0, 1);
    const part2 = digits.slice(1, 4);
    const part3 = digits.slice(4, 7);
    const part4 = digits.slice(7, 9);
    const part5 = digits.slice(9, 11);
    
    let res = `+${part1}`;
    if (part2) res += ` (${part2})`;
    if (part3) res += ` ${part3}`;
    if (part4) res += `-${part4}`;
    if (part5) res += `-${part5}`;
    return res;
  }
  
  // Default format
  return (hasPlus ? '+' : '') + digits;
}
