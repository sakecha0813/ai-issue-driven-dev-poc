package com.sakecha0813.aiissuedrivendevpoc;

import java.math.BigDecimal;
import java.math.RoundingMode;

public final class TaxIncludedPriceCalculator {
    private TaxIncludedPriceCalculator() {
    }

    public static int calculate(int taxExclusivePrice, BigDecimal taxRate) {
        return BigDecimal.valueOf(taxExclusivePrice)
                .multiply(BigDecimal.ONE.add(taxRate))
                .setScale(0, RoundingMode.HALF_UP)
                .intValueExact();
    }
}
