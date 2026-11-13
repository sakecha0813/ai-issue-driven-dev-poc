package com.sakecha0813.aiissuedrivendevpoc;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.math.BigDecimal;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class TaxIncludedPriceCalculatorTest {
    @ParameterizedTest
    @CsvSource({
            "1000, 0.10, 1100",
            "999, 0.10, 1099",
            "105, 0.10, 116",
            "0, 0.10, 0",
            "1000, 0, 1000"
    })
    void calculatesTaxIncludedPrice(int taxExclusivePrice, String taxRate, int expected) {
        assertEquals(expected, TaxIncludedPriceCalculator.calculate(
                taxExclusivePrice, new BigDecimal(taxRate)));
    }
}
