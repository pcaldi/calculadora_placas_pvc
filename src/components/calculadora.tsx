import React, { useState, ChangeEvent } from 'react';

interface ResultadoCalculo {
    numPlacas: number;
    areaTotal: number;
    areaPlaca: number;
}

export function Calculadora() {
    const [altura, setAltura] = useState<string>('');
    const [largura, setLargura] = useState<string>('');
    const [tamanhoPlaca, setTamanhoPlaca] = useState<string>('');
    const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);
    const [error, setError] = useState<string>('');

    // Função para formatar a entrada removendo vírgulas, pontos e espaços
    const formatarEntrada = (valor: string): string => {
        // Remove espaços, vírgulas e pontos
        const valorLimpo = valor.replace(/[,.\s]/g, '');
        return valorLimpo;
    };



    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: ChangeEvent<HTMLInputElement>) => {
            // Aplica a formatação ao valor e atualiza o estado
            setter(e.target.value);
        };



    function calcularPlacas() {
        // Processa e formata os valores de entrada
        const alturaFormatada = formatarEntrada(altura);
        const larguraFormatada = formatarEntrada(largura);
        const tamanhoPlacaFormatado = formatarEntrada(tamanhoPlaca);

        // Validar entradas
        if (!alturaFormatada || !larguraFormatada || !tamanhoPlacaFormatado) {
            setError('Por favor, preencha todos os campos.');
            setResultado(null);
            return;
        }

        // Converter para números
        const alturaNum = parseInt(alturaFormatada, 10);
        const larguraNum = parseInt(larguraFormatada, 10);
        const tamanhoPlacaNum = parseInt(tamanhoPlacaFormatado, 10);

        // Validar números positivos
        if (alturaNum <= 0 || larguraNum <= 0 || tamanhoPlacaNum <= 0) {
            setError('Todos os valores devem ser números positivos.');
            setResultado(null);
            return;
        }

        // Calcular área total necessária em cm²
        const areaTotal = alturaNum * larguraNum;

        // Calcular área de cada placa (quadrada) em cm²
        const areaPlaca = tamanhoPlacaNum * tamanhoPlacaNum;

        // Calcular número de placas necessárias (arredondando para cima)
        const numPlacas = Math.ceil(areaTotal / areaPlaca);

        setResultado({
            numPlacas,
            areaTotal,
            areaPlaca,
        });

        setError('');
    };

    function handleResetResultado() {
        setAltura('');
        setLargura('');
        setTamanhoPlaca('');
        setResultado(null);
        setError('');
    }



    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Calculadora de Placas de PVC</h1>

                <div className="space-y-4">
                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-3">Dimensões da Área</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Altura (cm)
                                </label>
                                <input
                                    type="text"
                                    value={altura}
                                    onChange={handleInputChange(setAltura)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Ex: 1.50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Largura (cm)
                                </label>
                                <input
                                    type="text"
                                    value={largura}
                                    onChange={handleInputChange(setLargura)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Ex: 2.00"
                                />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Não se preocupe com pontos, vírgulas ou espaços.</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-3">Dimensão da Placa de PVC (Quadrada)</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tamanho do Lado (cm)
                            </label>
                            <input
                                type="text"
                                value={tamanhoPlaca}
                                onChange={handleInputChange(setTamanhoPlaca)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Ex: 35 centímetros"
                            />
                            <p className="text-sm text-gray-500 mt-1">A placa é quadrada (lados iguais)</p>
                        </div>
                    </div>


                    <button
                        onClick={calcularPlacas}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Calcular
                    </button>


                    <button
                        onClick={handleResetResultado}
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                    >
                        Limpar Resultado
                    </button>

                    {error && (
                        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    {resultado && (
                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                            <h3 className="text-lg font-bold text-green-800 mb-2">Resultado</h3>
                            <div className="space-y-2">
                                <p><span className="font-medium">Placas necessárias:</span> {resultado.numPlacas}</p>
                                <p><span className="font-medium">Área total necessária:</span> {`${(resultado.areaTotal / 10000).toFixed(2)} metros`}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-sm text-gray-600 border-t pt-4">
                    <p className="font-medium mb-2">Instruções:</p>
                    <ol className="list-decimal pl-5 space-y-1">
                        <li>Digite as dimensões em centímetros (sem se preocupar com pontos, vírgulas ou espaços)</li>
                        <li>Exemplo: você pode digitar "250", "250,00", "250.00" ou "2 5 0" - todos serão interpretados como 250cm</li>
                        <li>Selecione sua unidade de preferência para visualização dos resultados</li>
                        <li>Clique em "Calcular" para obter o número de placas necessárias</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

