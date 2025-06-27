import {
  Service,
  TierEntity,
  Percent1,
} from '../../core/store/Services/servicesState';

export function initFees(service: Service, amount: string) {
  let fee = 0;
  if (service?.Fees) {
    for (const f of service.Fees) {
      if (f.AcctType && f.AcctType !== 'SDA') continue;
      fee = fee + calculateFees(Number(amount), f.Tier as TierEntity[]);
    }
  }
  return fee;
}

export function calculateFees(amount: number, tiers: TierEntity[]) {
  if (!tiers || !amount || amount < 0) return 0;

  const tier = tiers.find(t => amount >= t.LowerAmt && amount <= t.UpperAmt);

  if (!tier) return 0;

  const fixed = tier.FixedAmt?.Amt || 0;
  const percent = tier.Percent?.Value ? tier.Percent.Value / 100 : 0;
  const minPercentFee = (tier.Percent as Percent1)?.MinAmt || 0;
  const maxPercentFee = tier.Percent?.MaxAmt || 0;
  const calculatedPercentFee = Number((percent * amount).toFixed(2));

  const percentFee = Math.min(
    Math.max(calculatedPercentFee, minPercentFee),
    maxPercentFee,
  );

  return fixed + percentFee;
}
